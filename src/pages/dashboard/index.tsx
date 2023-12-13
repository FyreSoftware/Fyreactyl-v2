import { Container, Paper, type PaperProps, Stack, Text } from "@mantine/core";
import { DashboardPage } from "~/components/Page/Page";
import PageHeader from "~/components/Page/PageHeader";
import Surface from "~/components/Surface/Surface";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "~/utils/session";

const PAPER_PROPS: PaperProps = {
  p: "md",
  shadow: "md",
  radius: "md",
};
export default function DashboardIndexPage() {
  return (
    <DashboardPage
      seo={{ title: "Dashboard", description: "View your dashboard!" }}
    >
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Dashboard" withActions />
          <Surface component={Paper} {...PAPER_PROPS}>
            <Text size="lg" fw={600} mb="xl">
              Empty card header
            </Text>
            <Text>Empty card text</Text>
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
