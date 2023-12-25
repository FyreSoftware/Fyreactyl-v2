import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  DataTable,
  DataTableProps,
  DataTableSortStatus,
} from "mantine-datatable";
import {
  ActionIcon,
  Badge,
  Group,
  MantineColor,
  MultiSelect,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import sortBy from "lodash/sortBy";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { Voucher } from "@prisma/client";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import { modals } from "@mantine/modals";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";

const PAGE_SIZES = [10, 20, 30];

type VoucherTableProps = {
  data: Voucher[];
  error?: ReactNode;
  loading?: boolean;
};

const VoucherTable = ({ data, loading, error }: VoucherTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0] as number);
  const [selectedRecords, setSelectedRecords] = useState<Voucher[]>([]);
  const [records, setRecords] = useState<Voucher[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "code",
    direction: "asc",
  });
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const deleteVoucherMutation = api.vouchers.delete.useMutation({
    onError(error) {
      notifications.show({
        color: "Red",
        title: "Error!",
        message: error.message,
      });
    },
    onSuccess() {
      notifications.show({
        color: "Green",
        title: "Deleted voucher!",
        message: "The voucher has been deleted.",
      });
    },
  });
  const openDeleteModal = (code: string) =>
    modals.openConfirmModal({
      title: "Delete voucher",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this voucher?</Text>
      ),
      labels: { confirm: "Delete it!", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => deleteVoucherMutation.mutate({ code: code }),
    });
  const columns: DataTableProps<Voucher>["columns"] = [
    {
      accessor: "code",
      render: (item: Voucher) => <span>{item.code}</span>,
    },
    {
      accessor: "createdAt",
      title: "Created on",
      render: (item: Voucher) => <span>{item.createdAt.toDateString()}</span>,
    },
    {
      accessor: "coins",
      sortable: true,
      render: (item: Voucher) => <span>{item.currency}</span>,
    },
    {
      accessor: "amount",
      sortable: true,
      title: "Amount of vouchers left",
    },
    {
      accessor: "",
      title: "Actions",
      render: (item: Voucher) => (
        <Group gap="sm">
          <Tooltip label="Delete voucher">
            <ActionIcon onClick={() => openDeleteModal(item.code)}>
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      ),
    },
  ];

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const d = sortBy(data, sortStatus.columnAccessor) as Voucher[];
    const dd = d.slice(from, to) as Voucher[];
    let filtered = sortStatus.direction === "desc" ? dd.reverse() : dd;

    if (debouncedQuery || selectedStatuses.length) {
      filtered = data
        .filter(({ code }) => {
          if (
            debouncedQuery !== "" &&
            !code.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false;
          }

          return true;
        })
        .slice(from, to);
    }

    setRecords(filtered);
  }, [sortStatus, data, page, pageSize, debouncedQuery, selectedStatuses]);

  return error ? (
    <ErrorAlert title="Error loading orders" message={error.toString()} />
  ) : (
    <DataTable
      minHeight={200}
      verticalSpacing="sm"
      striped={true}
      // @ts-ignore
      columns={columns}
      records={records}
      selectedRecords={selectedRecords}
      // @ts-ignore
      onSelectedRecordsChange={setSelectedRecords}
      totalRecords={
        debouncedQuery || selectedStatuses.length > 0
          ? records.length
          : data.length
      }
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      fetching={loading}
    />
  );
};

export default VoucherTable;
