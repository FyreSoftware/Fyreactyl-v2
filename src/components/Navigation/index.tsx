import { ActionIcon, Box, Flex, Group, ScrollArea, Text } from "@mantine/core";
import {
  IconAdjustmentsFilled,
  IconShoppingBag,
  IconX,
} from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./navigation.module.css";
import Logo from "../Logo";
import { LinksGroup } from "./Links/Links";
import { useRouter } from "next/router";
import { UserButton } from "../UserButton/UserButton";

const mockdata = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Dashboard",
        icon: IconAdjustmentsFilled,
        link: "/dashboard",
      },
      {
        label: "Store",
        icon: IconShoppingBag,
        link: "/dashboard/store",
      },
    ],
  },
];

type NavigationProps = {
  onClose: () => void;
};

const Navigation = ({ onClose, ...others }: NavigationProps) => {
  const tablet_match = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const links = mockdata.map((m) => (
    <Box pl={0} mb="md" key={m.title}>
      <Text
        tt="uppercase"
        size="xs"
        pl="md"
        fw={500}
        mb="sm"
        className={classes.linkHeader}
      >
        {m.title}
      </Text>
      {m.links.map((item) => (
        <LinksGroup
          {...item}
          key={item.label}
          initiallyOpened={router.pathname === item.link}
        />
      ))}
    </Box>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Flex justify="space-between" align="center" gap="sm">
          <Group
            justify="space-between"
            style={{ flex: tablet_match ? "auto" : 1 }}
          >
            <Logo c="white" />
          </Group>
          {tablet_match && (
            <ActionIcon onClick={onClose} variant="transparent">
              <IconX color="white" />
            </ActionIcon>
          )}
        </Flex>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton user={{ username: "Tovade" }} />
      </div>
    </nav>
  );
};

export default Navigation;
