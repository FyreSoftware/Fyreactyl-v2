import {
  Anchor,
  Box,
  Container,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";

import { Meta } from "@/layouts/Meta";
import { useForm } from "@/components/Form";
import { z } from "zod";
import { SignupAction } from "@/lib/actions";
import { showNotification } from "@mantine/notifications";
import { createNotificationConfig } from "@/utils/notification";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

export default function Signup() {
  const [Form] = useForm<{
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    passwordConfirmation: string;
  }>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      passwordConfirmation: "",
    },
    onSubmit: (values) => {
      SignupAction(values).then((v) => {
        if (v.statusCode === 400) {
          return showNotification(
            createNotificationConfig("error", v.error, v.message.join(", "))
          );
        } else if (v.user) {
          showNotification(
            createNotificationConfig(
              "success",
              "Account created",
              "Your account has been created. You will be redirected soon."
            )
          );
          setCookie(null, "token", v.accessToken, {
            maxAge: v.expiresIn,
            path: "/",
            secure: true,
          });
          setTimeout(() => {
            //TODO: Fix this hook issue i caused lol no need to thank me
            const router = useRouter();
            router.push("/dashboard");
          }, 5000);
        }
        return showNotification(
          createNotificationConfig("error", "Error", "An error occured")
        );
      });
    },
    schema: z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
        username: z.string().min(2),
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        passwordConfirmation: z.string().min(6),
      })
      .superRefine(({ passwordConfirmation, password }, ctx) => {
        if (passwordConfirmation !== password) {
          ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
          });
        }
      }),
    controllers: {
      email: {
        label: "Email",
        name: "email",
        control: "text-input",
        required: true,
        placeholder: "Enter your email",
        withAsterisk: true,
      },
      username: {
        label: "Username",
        name: "username",
        control: "text-input",
        required: true,
        placeholder: "Enter your username",
        withAsterisk: true,
      },
      firstName: {
        label: "First name",
        name: "firstName",
        control: "text-input",
        required: true,
        placeholder: "Enter your first name",
        withAsterisk: true,
      },
      lastName: {
        label: "Last name",
        name: "lastName",
        control: "text-input",
        required: true,
        placeholder: "Enter your last name",
        withAsterisk: true,
      },
      password: {
        label: "Password",
        name: "password",
        control: "password-input",
        required: true,
        placeholder: "Enter your password",
        withAsterisk: true,
      },
      passwordConfirmation: {
        label: "Confirm password",
        name: "passwordConfirmation",
        control: "password-input",
        required: true,
        placeholder: "Confirm your password",
        withAsterisk: true,
      },
    },
  });
  return (
    <>
      <Meta title="Company | Login" description="log into your account" />
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Hello!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor<"a"> href="/auth/login" size="sm">
            Login instead
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Form>
            {({ formState: { isSubmitting } }) => (
              <Box mt={25}>
                <Form.Button
                  loading={isSubmitting}
                  type="submit"
                  fullWidth
                  mt="xl"
                >
                  Create account
                </Form.Button>
              </Box>
            )}
          </Form>
        </Paper>
      </Container>
    </>
  );
}
