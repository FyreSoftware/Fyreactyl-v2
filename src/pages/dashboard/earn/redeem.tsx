import {
  Container,
  Paper,
  type PaperProps,
  Stack,
  Text,
  Button,
  Group,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { DashboardPage } from "~/components/Page/Page";
import PageHeader from "~/components/Page/PageHeader";
import Surface from "~/components/Surface/Surface";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "~/utils/session";
import StatsGrid from "~/components/StatsGrid/StatsGrid";
import { api } from "~/utils/api";
import { type User } from "@prisma/client";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";

const PAPER_PROPS: PaperProps = {
  p: "md",
  shadow: "md",
  radius: "md",
};
type Props = {
  user: User;
};

const schema = z.object({
  code: z.string().max(10, "Code cannot be longer than 10 characters."),
});
export default function RedeemVoucherPage({ user }: Props) {
  const redeemVoucherMutation = api.vouchers.redeem.useMutation({
    onSuccess() {
      notifications.show({
        color: "Green",
        title: "Redeemed!",
        message: "You have redeemed the voucher successfully!",
      });
      return;
    },
    onError(error) {
      return notifications.show({
        color: "red",
        title: "Error!",
        message: error.message,
      });
    },
  });
  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: zodResolver(schema),
  });
  const handleSubmit = (values: { code: string }) => {
    redeemVoucherMutation.mutate(values);
  };
  return (
    <DashboardPage
      seo={{ title: "Redeem", description: "Redeem a voucher code." }}
      user={user}
    >
      <Container fluid>
        <Stack gap="lg">
          <PageHeader title="Redeem" withActions />
          <StatsGrid
            data={[
              {
                title: "Coins",
                value: user.coins.toString(),
              },
              {
                title: "Active products",
                value: "0",
              },
            ]}
            loading={false}
            error={false}
            paperProps={PAPER_PROPS}
          />
          <Surface component={Paper} {...PAPER_PROPS}>
            <Group justify="space-between" mb="md">
              <Text size="lg" fw={600}>
                Redeem voucher
              </Text>
            </Group>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <LoadingOverlay visible={redeemVoucherMutation.isLoading} />
              <TextInput
                withAsterisk
                mt={"md"}
                required
                label="Code"
                description="The code for the voucher."
                placeholder="Example: LAUNCH2023"
                {...form.getInputProps("code")}
              />
              <Button mt={"md"} color="blue" type="submit">
                Redeem
              </Button>
            </form>
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
