import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  NativeSelect,
  NumberInput,
  Stepper,
  Switch,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { type Product } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

export type ModalProps = {
  opened: boolean;
  onClose: () => void;
  product: Product;
};

const schema = z.object({
  name: z.string().max(24, "Name cannot be longer than 24 characters."),
  description: z
    .string()
    .max(100, "Description cannot be longer than 10 characters."),
  type: z.enum(["OneTime", "Weekly", "Monthly", "Yearly"]),
  price: z.number(),
  buyable: z.boolean(),
  specifications: z.object({
    cpu: z.number(),
    ram: z.number(),
    disk: z.number(),
    databases: z.number(),
    backups: z.number(),
  }),
});
export function EditProductModal(props: ModalProps) {
  const editProductMutation = api.products.edit.useMutation({
    onSuccess() {
      notifications.show({
        color: "Green",
        title: "Edited!",
        message: "The product has been updated!",
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
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const form = useForm<{
    name: string;
    description: string;
    type: "OneTime" | "Weekly" | "Monthly" | "Yearly";
    price: number;
    buyable: boolean;
    specifications: {
      cpu: number;
      ram: number;
      disk: number;
      databases: number;
      backups: number;
    };
  }>({
    initialValues: {
      name: props.product.name,
      description: props.product.description,
      type: props.product.type,
      buyable: props.product.buyable,
      price: props.product.price,
      specifications: props.product.specifications,
    },
    validate: zodResolver(schema),
  });
  const handleSubmit = (values: {
    name: string;
    description: string;
    type: "OneTime" | "Weekly" | "Monthly" | "Yearly";
    price: number;
    buyable: boolean;
    specifications: {
      cpu: number;
      ram: number;
      disk: number;
      databases: number;
      backups: number;
    };
  }) => {
    editProductMutation.mutate({ id: props.product.id, ...values });
  };
  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      title={"Create product"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={editProductMutation.isLoading} />

        <Stepper active={active}>
          <Stepper.Step label="First step" description="Product details">
            <TextInput
              withAsterisk
              required
              label="Name"
              description="The name for the product."
              placeholder="Example: Node.Js server"
              {...form.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              required
              label="Description"
              description="The description for the product."
              placeholder="Example: A powerful javascript server"
              {...form.getInputProps("description")}
            />
            <NativeSelect
              withAsterisk
              required
              label="Type"
              description="The type of the product."
              data={["OneTime", "Weekly", "Monthly", "Yearly"]}
              {...form.getInputProps("type")}
            />
            <Group grow>
              <NumberInput
                withAsterisk
                required
                mt="md"
                description="The price the product costs."
                label="Price"
                placeholder="500"
                hideControls
                {...form.getInputProps("price")}
              />
              <Switch
                required
                mt="md"
                description="Make the product buyable via the store."
                label="On sale"
                {...form.getInputProps("buyable")}
              />
            </Group>
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Product specifications"
          >
            <Group grow>
              <NumberInput
                withAsterisk
                required
                mt="md"
                description="The cpu that the product needs."
                label="CPU"
                placeholder="10"
                hideControls
                rightSection="%"
                {...form.getInputProps("specifications.cpu")}
              />
              <NumberInput
                withAsterisk
                required
                mt="md"
                description="The amount of ram the product needs."
                label="Memory"
                placeholder="500"
                hideControls
                rightSection="MB"
                {...form.getInputProps("specifications.ram")}
              />
            </Group>
            <NumberInput
              withAsterisk
              required
              mt="md"
              description="The amount of disk the product needs."
              label="Disk"
              placeholder="1024"
              hideControls
              rightSection="MB"
              {...form.getInputProps("specifications.disk")}
            />
            <NumberInput
              withAsterisk
              required
              mt="md"
              description="The amount of databases the product comes with."
              label="Databases"
              placeholder="2"
              hideControls
              {...form.getInputProps("specifications.databases")}
            />
            <NumberInput
              withAsterisk
              required
              mt="md"
              description="The amount of backups the product offers."
              label="Backups"
              placeholder="2"
              hideControls
              {...form.getInputProps("specifications.backups")}
            />
          </Stepper.Step>
          <Stepper.Completed>
            <LoadingOverlay visible={true} />
          </Stepper.Completed>
        </Stepper>
        {active === 1 ? (
          <Group align="right">
            <Button
              mt={"md"}
              color="gray"
              onClick={() => setActive(0)}
              key={"back"}
            >
              Back
            </Button>
            <Button mt={"md"} color="blue" type="submit" key="submit">
              Edit
            </Button>
          </Group>
        ) : (
          <Button mt="md" color="blue" onClick={() => nextStep()} key="next">
            Next step
          </Button>
        )}
      </form>
    </Modal>
  );
}
