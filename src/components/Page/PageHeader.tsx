"use client";

import {
  ActionIcon,
  Breadcrumbs,
  type BreadcrumbsProps,
  Button,
  Divider,
  Flex,
  Paper,
  type PaperProps,
  rem,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus, IconRefresh } from "@tabler/icons-react";
import { useColorScheme } from "@mantine/hooks";
import Surface from "../Surface/Surface";
import { type ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  withActions?: boolean;
  breadcrumbItems?: unknown;
  invoiceAction?: boolean;
} & PaperProps;

const PageHeader = (props: PageHeaderProps) => {
  const { withActions, breadcrumbItems, title, invoiceAction, ...others } =
    props;
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();

  const BREADCRUMBS_PROPS: Omit<BreadcrumbsProps, "children"> = {
    style: {
      a: {
        padding: rem(8),
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: colorScheme === "dark" ? theme.white : theme.black,

        "&:hover": {
          transition: "all ease 150ms",
          backgroundColor:
            colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[2],
          textDecoration: "none",
        },
      },
    },
  };

  return (
    <>
      <Surface
        component={Paper}
        style={{ backgroundColor: "transparent" }}
        {...others}
      >
        {withActions ? (
          <Flex
            justify="space-between"
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "sm", sm: 4 }}
          >
            <Stack gap={4}>
              <Title order={3}>{title}</Title>
              <Text>Welcome back!</Text>
            </Stack>
            <Flex align="center" gap="sm">
              <ActionIcon variant="subtle">
                <IconRefresh size={16} />
              </ActionIcon>
            </Flex>
          </Flex>
        ) : invoiceAction ? (
          <Flex
            align="center"
            justify="space-between"
            direction={{ base: "row", sm: "row" }}
            gap={{ base: "sm", sm: 4 }}
          >
            <Stack>
              <Title order={3}>{title}</Title>
              <Breadcrumbs {...BREADCRUMBS_PROPS}>
                {breadcrumbItems as ReactNode}
              </Breadcrumbs>
            </Stack>
            <Button leftSection={<IconPlus size={18} />}>New Invoice</Button>
          </Flex>
        ) : (
          <Stack gap="sm">
            <Title order={3}>{title}</Title>
            <Breadcrumbs {...BREADCRUMBS_PROPS}>
              {breadcrumbItems as ReactNode}
            </Breadcrumbs>
          </Stack>
        )}
      </Surface>
      <Divider />
    </>
  );
};

export default PageHeader;
