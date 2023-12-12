import { Container, Paper, type PaperProps, Stack, Text } from "@mantine/core";
import { DashboardPage } from "~/components/Page/Page";
import PageHeader from "~/components/Page/PageHeader";
import Surface from "~/components/Surface/Surface";

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
