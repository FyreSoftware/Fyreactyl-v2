import {
  Button,
  LoadingOverlay,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { z } from "zod";
import { api } from "~/utils/api";

export type ModalProps = {
  opened: boolean;
  onClose: () => void;
};

const schema = z.object({
  code: z.string().max(10, "Code cannot be longer than 10 characters."),
  coins: z.number(),
  amount: z.number(),
});
export function CreateVoucherModal(props: ModalProps) {
  const voucherCreationMutation = api.vouchers.create.useMutation({
    onSuccess(data) {
      notifications.show({
        color: "Green",
        title: "Registered!",
        message: "You will be redirected to the dashboard",
      });
      return props.onClose();
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
      coins: 0,
      amount: 0,
    },
    validate: zodResolver(schema),
  });
  const handleSubmit = (values: {
    code: string;
    coins: number;
    amount: number;
  }) => {
    voucherCreationMutation.mutate(values);
  };
  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      title={"Create voucher"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={voucherCreationMutation.isLoading} />
        <TextInput
          withAsterisk
          required
          label="Code"
          description="The code for the voucher."
          placeholder="Example: LAUNCH2023"
          {...form.getInputProps("code")}
        />
        <NumberInput
          withAsterisk
          required
          mt="md"
          description="The amount of coins to grant when redeemed."
          label="Coins"
          placeholder="500"
          hideControls
          {...form.getInputProps("coins")}
        />
        <NumberInput
          withAsterisk
          required
          mt="md"
          description="The amount of vouchers to generate. When the amount runs out, the voucher is no longer redeemable."
          label="Voucher amount"
          placeholder="20"
          hideControls
          {...form.getInputProps("amount")}
        />
        <Button mt={"md"} color="blue" type="submit">
          Create voucher
        </Button>
      </form>
    </Modal>
  );
}
