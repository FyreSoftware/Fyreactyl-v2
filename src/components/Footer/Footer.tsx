import { Group, ActionIcon, rem, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import classes from "./Footer.module.css";
import React from "react";

export function Footer() {
  return (
    <Group justify="space-between">
      <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
        <ActionIcon size="lg" color="gray" variant="subtle">
          <IconBrandGithub
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
      <Text c="dimmed" fz="sm">
        &copy;&nbsp;{new Date().getFullYear()}&nbsp;Fyre Software
      </Text>
    </Group>
  );
}
