import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import classes from "./Header.module.css";
import React from "react";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import LanguagePicker from "../LanguagePicker";

export interface HeaderProps {
  toggle: () => void;
  close: () => void;
  drawerOpened: boolean;
}
export function Header({ toggle, close, drawerOpened }: HeaderProps) {
  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Features
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default" component="a" href="/auth/login">
              Log in
            </Button>
            <Button component="a" href="/auth/introduction">
              Sign up
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggle} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="#" className={classes.link}>
            Home
          </a>
          <a href="#" className={classes.link}>
            Features
          </a>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" component="a" href="/auth/login">
              Log in
            </Button>
            <Button component="a" href="/auth/introduction">
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

type HeaderNavProps = {
  desktopOpened?: boolean;
  toggleDesktop?: () => void;
};

export function DashboardHeader({
  desktopOpened,
  toggleDesktop,
}: HeaderNavProps) {
  return (
    <Group justify="space-between">
      <Group gap={0}>
        <Tooltip label="Toggle side navigation">
          <ActionIcon visibleFrom="md" onClick={toggleDesktop}>
            {desktopOpened ? (
              <IconLayoutSidebarLeftCollapse />
            ) : (
              <IconLayoutSidebarLeftExpand />
            )}
          </ActionIcon>
        </Tooltip>
      </Group>
      <Group>
        <LanguagePicker type="collapsed" />
      </Group>
    </Group>
  );
}
