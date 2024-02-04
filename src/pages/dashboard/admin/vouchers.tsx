import {
  Container,
  Paper,
  type PaperProps,
  Stack,
  Text,
  Group,
  ActionIcon,
} from "@mantine/core";
import { DashboardPage } from "~/components/Page/Page";
import PageHeader from "~/components/Page/PageHeader";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "~/utils/session";
import { IconPlus } from "@tabler/icons-react";
import { api } from "~/utils/api";
import { type User } from "@prisma/client";
import VoucherTable from "~/components/AdminTables/VouchersTable";
import { useDisclosure } from "@mantine/hooks";
import { CreateVoucherModal } from "~/components/Modal/CreateVoucherModal";

const PAPER_PROPS: PaperProps = {
  p: "md",
  shadow: "md",
  radius: "md",
};
type Props = {
  user: User;
};
export default function DashboardIndexPage({ user }: Props) {
  const vouchersList = api.vouchers.list.useQuery();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <DashboardPage
      seo={{ title: "Vouchers", description: "View, create, edit vouchers!" }}
      user={user}
    >
      <CreateVoucherModal opened={opened} onClose={close} />
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Vouchers" withActions />
          <Paper {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text fz="lg" fw={600}>
                Vouchers
              </Text>
              <ActionIcon onClick={open}>
                <IconPlus size={18} />
              </ActionIcon>
            </Group>
            <VoucherTable
              data={vouchersList.data?.data ?? []}
              error={vouchersList.isError}
              loading={vouchersList.isLoading}
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
