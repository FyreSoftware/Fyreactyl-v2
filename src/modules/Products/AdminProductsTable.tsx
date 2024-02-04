/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { type ReactNode, useEffect, useState } from "react";
import {
  DataTable,
  type DataTableProps,
  type DataTableSortStatus,
} from "mantine-datatable";
import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import sortBy from "lodash/sortBy";
import { useDebouncedValue } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { type Product } from "@prisma/client";
import { modals } from "@mantine/modals";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import ErrorAlert from "~/components/ErrorAlert/ErrorAlert";

const PAGE_SIZES = [10, 20, 30];

type ProductTableProps = {
  data: Product[];
  error?: ReactNode;
  loading?: boolean;
  onEdit: (product: Product) => void;
  onDelete: () => void;
};

const AdminProductTable = ({
  data,
  loading,
  error,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]!);
  const [selectedRecords, setSelectedRecords] = useState<Product[]>([]);
  const [records, setRecords] = useState<Product[]>(data.slice(0, pageSize));
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "code",
    direction: "asc",
  });
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebouncedValue(query, 200);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const deleteVoucherMutation = api.products.delete.useMutation({
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
        title: "Deleted product!",
        message: "The product has been deleted.",
      });
    },
  });
  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      title: "Delete product",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this product?</Text>
      ),
      labels: { confirm: "Delete it!", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {
        return;
      },
      onConfirm: () => {
        deleteVoucherMutation.mutate({ id });
        onDelete();
      },
    });
  const columns: DataTableProps<Product>["columns"] = [
    {
      accessor: "name",
      render: (item: Product) => <span>{item.name}</span>,
    },
    {
      accessor: "type",
      sortable: true,
      title: "Type",
    },
    {
      accessor: "price",
      sortable: true,
      render: (item: Product) => <span>{item.price}</span>,
    },
    {
      accessor: "createdAt",
      title: "Created on",
      render: (item: Product) => <span>{item.createdAt.toDateString()}</span>,
    },
    {
      accessor: "",
      title: "Actions",
      render: (item: Product) => (
        <Group gap="sm">
          <Tooltip label="Delete product">
            <ActionIcon onClick={() => openDeleteModal(item.id)}>
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit product">
            <ActionIcon onClick={() => onEdit(item)}>
              <IconPencil size={18} />
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
    const d = sortBy(data, sortStatus.columnAccessor);
    const dd = d.slice(from, to);
    let filtered = sortStatus.direction === "desc" ? dd.reverse() : dd;

    if (debouncedQuery || selectedStatuses.length) {
      filtered = data
        .filter(({ name }) => {
          if (
            debouncedQuery !== "" &&
            !name.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
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
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    <ErrorAlert title="Error loading products" message={error.toString()} />
  ) : (
    <DataTable
      minHeight={200}
      verticalSpacing="sm"
      striped={true}
      // @ts-expect-error this is unfixable
      columns={columns}
      records={records}
      selectedRecords={selectedRecords}
      // @ts-expect-error this is unfixable
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

export default AdminProductTable;
