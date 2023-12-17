import { UnstyledButton, Group, Avatar, Text, rem, Menu } from "@mantine/core";
import {
  IconChevronRight,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import classes from "./UserButton.module.css";

export type UserButtonProps = {
  user: {
    username: string;
  };
};
export function UserButton({ user }: UserButtonProps) {
  return (
    <Menu
      shadow="md"
      position="right-end"
      trigger="hover"
      openDelay={100}
      closeDelay={400}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar color="cyan" radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {user.username}
              </Text>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Settings
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          color="red"
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
