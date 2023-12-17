import { DataTable } from "mantine-datatable";
import { Badge, type MantineColor } from "@mantine/core";
import ErrorAlert from "../ErrorAlert/ErrorAlert";

type Status = "Expired" | "Active" | "Expiring";

const StatusBadge = ({ status }: { status: Status }) => {
  let color: MantineColor = "";

  switch (status) {
    case "Expired":
      color = "red";
      break;
    case "Active":
      color = "green";
      break;
    case "Expiring":
      color = "orange";
      break;
    default:
      color = "gray";
  }

  return (
    <Badge color={color} variant="filled" radius="sm">
      {status}
    </Badge>
  );
};

type ProductItem = {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  state: Status;
};

type ProductsTableProps = {
  data?: ProductItem[];
  error: string | undefined;
  loading: boolean;
};
const ProductsTable = ({ data, error, loading }: ProductsTableProps) => {
  return error ? (
    <ErrorAlert title="Error loading projects" message={error.toString()} />
  ) : (
    <DataTable
      verticalSpacing="sm"
      highlightOnHover
      columns={[
        { accessor: "name" },
        { accessor: "start_date" },
        { accessor: "end_date" },
        {
          accessor: "state",
          render: ({ state }: { state: Status }) => (
            <StatusBadge status={state} />
          ),
        },
      ]}
      records={data}
      emptyState={false}
      fetching={loading}
    />
  );
};

export default ProductsTable;
