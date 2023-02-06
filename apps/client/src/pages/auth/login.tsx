import {
  Anchor,
  Box,
  Checkbox,
  Container,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";

import { Meta } from "@/layouts/Meta";
import { useForm } from "@/components/Form";
import { z } from "zod";
import { LoginAction } from "@/lib/actions";
import { showNotification } from "@mantine/notifications";
import { createNotificationConfig } from "@/utils/notification";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

export default function Login() {
  const [Form] = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      LoginAction(values).then((v) => {
        if (v.statusCode === 400) {
          return showNotification(
            createNotificationConfig("error", v.error, v.message.join(", "))
          );
        } else if (v.user) {
          showNotification(
            createNotificationConfig(
              "success",
              "Logged in successfully",
              "You will be redirected soon."
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
    schema: z.object({
      email: z.string().email(),
      password: z.string().min(6),
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
      password: {
        label: "Password",
        name: "password",
        control: "password-input",
        required: true,
        placeholder: "Enter your password",
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
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor<"a"> href="/auth/signup" size="sm">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Form>
            {({ formState: { isSubmitting } }) => (
              <Box mt={25}>
                <Group position="apart" mt="lg">
                  <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
                  <Anchor<"a">
                    onClick={(event) => event.preventDefault()}
                    href="#"
                    size="sm"
                  >
                    Forgot password?
                  </Anchor>
                </Group>
                <Form.Button
                  loading={isSubmitting}
                  type="submit"
                  fullWidth
                  mt="xl"
                >
                  Sign in
                </Form.Button>
              </Box>
            )}
          </Form>
        </Paper>
      </Container>
    </>
  );
}
