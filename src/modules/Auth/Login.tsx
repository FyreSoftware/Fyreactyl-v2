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
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, "A password should atleast be 6 characters long"),
});

export function Login() {
  const [active, setActive] = React.useState(0);
  const router = useRouter();
  const loginMutation = api.auth.login.useMutation({
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
        title: "Logged in!",
        message: "You will be redirected to the dashboard",
      });
      setTimeout(async () => {
        await router.push("/dashboard");
      }, 2000);
    },
  });
  const existMutation = api.auth.checkExist.useMutation({
    onError: () => {
      notifications.show({
        color: "red",
        title: "Woops!",
        message: "Account not found, maybe wrong email?",
      });
    },
    onSuccess: () => {
      notifications.show({
        color: "Green",
        title: "Account found!",
        message: "Fill in your password to login",
      });
      nextStep();
    },
  });
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(schema),
  });
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const firstStep = async () => {
    existMutation.mutate({ email: form.values.email });
  };
  const finalStep = async () => {
    await loginMutation.mutateAsync(form.values);
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
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
              <br />
              <Button
                variant="light"
                disabled={!form.isValid("email")}
                onClick={firstStep}
              >
                Next step
              </Button>
            </Stepper.Step>
            <Stepper.Step
              label="Final step"
              description="Fill in your password"
            >
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
                Login
              </Button>
            </Stepper.Step>
            <Stepper.Completed>Completed</Stepper.Completed>
          </Stepper>
        </Card>
      </Center>
    </>
  );
}
