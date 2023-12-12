import { Title, Text, Center, Button } from "@mantine/core";
import classes from "./Welcome.module.css";
import { IconExternalLink } from "@tabler/icons-react";
import React from "react";
import { api } from "~/utils/api";

export function Welcome() {
  const user = api.auth.user.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Your dashboard
        </Text>
      </Title>
      <Text color="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Welcome to Fyreactyl, a resource management dashboard for users to use
        for hosting their project.
      </Text>
      <Center mt={20}>
        {user.isError ? (
          <Button
            component="a"
            href="/auth/introduction"
            rightSection={<IconExternalLink size={20} />}
            variant="gradient"
            gradient={{ from: "cyan", to: "purple" }}
          >
            Get started
          </Button>
        ) : (
          <Button
            component="a"
            href="/dashboard"
            rightSection={<IconExternalLink size={20} />}
            variant="gradient"
            gradient={{ from: "cyan", to: "purple" }}
          >
            Go to dashboard
          </Button>
        )}
      </Center>
    </>
  );
}
