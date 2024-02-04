import {
  Container,
  Paper,
  type PaperProps,
  Stack,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { DashboardPage } from "~/components/Page/Page";
import PageHeader from "~/components/Page/PageHeader";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "~/utils/session";
import { IconPlus } from "@tabler/icons-react";
import { api } from "~/utils/api";
import { type Product, type User } from "@prisma/client";
import { useDisclosure } from "@mantine/hooks";
import { CreateProductModal } from "~/modules/Products/Modals/CreateProductModal";
import AdminProductTable from "~/modules/Products/AdminProductsTable";
import { EditProductModal } from "~/modules/Products/Modals/EditProductModal";
import { useState } from "react";

const PAPER_PROPS: PaperProps = {
  p: "md",
  shadow: "md",
  radius: "md",
};
type Props = {
  user: User;
};
export default function ProductsPage({ user }: Props) {
  const productList = api.products.list.useQuery();
  const [opened, { open, close }] = useDisclosure(false);

  const [editOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  const [product, setProduct] = useState<Product | null>(null);

  const openEditModal = (product: Product) => {
    setProduct(product);
    openEdit();
    return;
  };

  return (
    <DashboardPage
      seo={{ title: "Products", description: "View, create, edit products" }}
      user={user}
    >
      <CreateProductModal
        opened={opened}
        onClose={close}
        onCreate={async () => {
          await productList.refetch();
        }}
      />
      {product && (
        <EditProductModal
          opened={editOpened}
          onClose={closeEdit}
          product={product}
        />
      )}
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Products" withActions />
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text fz="lg" fw={600}>
                Products
              </Text>
              <Tooltip label="create product">
                <ActionIcon onClick={open}>
                  <IconPlus size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <AdminProductTable
              data={productList.data?.data ?? []}
              error={productList.isError}
              loading={productList.isLoading}
              onEdit={openEditModal}
              onDelete={async () => {
                await productList.refetch();
              }}
            />
          </Paper>
        </Stack>
      </Container>
    </DashboardPage>
  );
}
export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session && !req.session.user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    if (req.session.user?.role !== "Admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard",
        },
      };
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  },
  sessionOptions
);
