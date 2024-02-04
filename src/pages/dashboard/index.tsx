import {
  Container,
  Paper,
  type PaperProps,
  Stack,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { DashboardPage } from "~/components/Page/Page";
import PageHeader from "~/components/Page/PageHeader";
import Surface from "~/components/Surface/Surface";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "~/utils/session";
import StatsGrid from "~/components/StatsGrid/StatsGrid";
import { IconChevronRight } from "@tabler/icons-react";
import ProductsTable from "~/components/ProductsTable/ProductsTable";
import { type User } from "@prisma/client";

const PAPER_PROPS: PaperProps = {
  p: "md",
  shadow: "md",
  radius: "md",
};
type Props = {
  user: User;
};
export default function DashboardIndexPage({ user }: Props) {
  return (
    <DashboardPage
      seo={{ title: "Dashboard", description: "View your dashboard!" }}
      user={user}
    >
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Dashboard" withActions />
          <StatsGrid
            data={[
              {
                title: "Coins",
                value: user.coins.toString(),
              },
              {
                title: "Active products",
                value: "2",
              },
            ]}
            loading={false}
            error={false}
            paperProps={PAPER_PROPS}
          />
          <Surface component={Paper} {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text size="lg" fw={600}>
                Products
              </Text>
              <Button
                variant="subtle"
                rightSection={<IconChevronRight size={18} />}
              >
                View all
              </Button>
            </Group>
            <ProductsTable
              data={[
                {
                  id: "2cfb8640-4c4e-431d-a02a-24f103027ecb",
                  name: "Discord.py server",
                  start_date: "2/2/2023",
                  end_date: "2/2/2024",
                  state: "Active",
                },
                {
                  id: "a5fc92d3-73da-4be3-b94e-ea9b81c6a2fb",
                  name: "Discord.js server",
                  start_date: "12/20/2022",
                  end_date: "12/20/2023",
                  state: "Expiring",
                },
                {
                  id: "2d745034-d666-4626-a1c6-9288954c0433",
                  name: "Java server",
                  start_date: "7/16/2022",
                  end_date: "7/16/2023",
                  state: "Expired",
                },
              ]}
              loading={false}
              error={undefined}
            />
          </Surface>
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
    return {
      props: {
        user: req.session.user,
      },
    };
  },
  sessionOptions
);
