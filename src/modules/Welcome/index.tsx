import { Title, Text, Center, Button } from "@mantine/core";
import classes from "./Welcome.module.css";
import { IconExternalLink } from "@tabler/icons-react";
import React from "react";
import { api } from "~/utils/api";

export function Welcome() {
  const user = api.auth.user.useQuery(undefined, {
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
  console.log(user.isError);
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
        <Button
          component="a"
          href={user.isError ? "/auth/introduction" : "/dashboard" ?? "#"}
          rightSection={<IconExternalLink size={30} />}
          variant="gradient"
          loading={user.isLoading}
          gradient={{ from: "pink", to: "orange" }}
        >
          {user.isError ? "Get started" : "Go to dashboard"}
        </Button>
      </Center>
    </>
  );
}
