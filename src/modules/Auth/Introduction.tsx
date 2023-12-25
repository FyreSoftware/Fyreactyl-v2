/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Card,
  Center,
  PasswordInput,
  Stepper,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import React from "react";
import { z } from "zod";
import { api } from "~/utils/api";

const schema = z.object({
  username: z
    .string()
    .min(2, { message: "Username should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  first_name: z
    .string()
    .min(2, { message: "First name should have at least 2 letters" }),
  last_name: z.string().min(2, {
    message: "Last name should have at least 2 letters",
  }),
  password: z.string().min(6, "A password should atleast be 6 characters long"),
});

export function Introduction() {
  const [active, setActive] = React.useState(0);
  const router = useRouter();
  const registerMutation = api.auth.register.useMutation({
    onError: (error) => {
      notifications.show({
        color: "red",
        title: "Error!",
        message: error.message,
      });
    },
    onSuccess: () => {
      notifications.show({
        color: "Green",
        title: "Registered!",
        message: "You will be redirected to the dashboard",
      });
      setTimeout(async () => {
        await router.push("/dashboard");
      }, 2000);
    },
  });
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
      first_name: "",
      last_name: "",
    },

    validate: zodResolver(schema),
  });
  const checkTouchedStep2 = () => {
    if (
      form.isDirty("username") &&
      form.isDirty("last_name") &&
      form.isDirty("first_name")
    ) {
      return true;
    }
    return false;
  };
  const finalStep = async () => {
    await registerMutation.mutateAsync(form.values);
  };
  return (
    <>
      <Center>
        <Card m={"md"}>
          <Stepper
            active={active}
            onStepClick={setActive}
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="First step" description="Enter your email">
              <TextInput
                mt={"md"}
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
              <br />
              <Button
                variant="light"
                disabled={!form.isValid("email")}
                onClick={nextStep}
              >
                Next step
              </Button>
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Enter in details">
              <TextInput
                withAsterisk
                label="Username"
                placeholder="username123progamer"
                {...form.getInputProps("username")}
              />
              <br />
              <TextInput
                withAsterisk
                label="First name"
                placeholder="pro"
                {...form.getInputProps("first_name")}
              />
              <br />
              <TextInput
                withAsterisk
                label="Last name"
                placeholder="gamer"
                {...form.getInputProps("last_name")}
              />

              <br />
              <Button
                variant="light"
                disabled={!checkTouchedStep2()}
                onClick={nextStep}
              >
                Next step
              </Button>
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Create your password">
              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="Enter your password"
                {...form.getInputProps("password")}
              />
              <br />
              <Button
                variant="light"
                disabled={!form.isValid("password")}
                onClick={finalStep}
              >
                Register
              </Button>
            </Stepper.Step>
            <Stepper.Completed>Completed</Stepper.Completed>
          </Stepper>
        </Card>
      </Center>
    </>
  );
}
