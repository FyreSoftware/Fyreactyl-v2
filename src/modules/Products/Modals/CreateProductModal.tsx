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
import { useState } from "react";
import { z } from "zod";
import { api } from "~/utils/api";

export type ModalProps = {
  opened: boolean;
  onClose: () => void;
  onCreate: () => void;
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
export function CreateProductModal(props: ModalProps) {
  const productCreationMutation = api.products.create.useMutation({
    onSuccess() {
      notifications.show({
        color: "Green",
        title: "Created!",
        message: "The product is added to the store!",
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
      name: "",
      description: "",
      type: "OneTime",
      buyable: true,
      price: 0,
      specifications: {
        cpu: 0,
        ram: 0,
        disk: 0,
        databases: 0,
        backups: 0,
      },
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
    productCreationMutation.mutate(values);
    setActive(0);
    props.onCreate();
  };
  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      title={"Create product"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={productCreationMutation.isLoading} />

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
            <Group justify={"center"} grow>
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
                description="The amount of ram included in the product."
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
        {(active === 1 && (
          <Button mt={"md"} key="submit" color="blue" type="submit">
            Create product
          </Button>
        )) || (
          <Button
            mt="md"
            key="next"
            color="blue"
            disabled={!form.isTouched("price")}
            onClick={() => nextStep()}
          >
            Next step
          </Button>
        )}
      </form>
    </Modal>
  );
}
