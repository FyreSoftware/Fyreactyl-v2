import { NextSeo } from "next-seo";
import React from "react";
import { DashboardHeader, Header } from "~/components/Header/Header";
import { AppShell, Box, Container, rem, useMantineTheme } from "@mantine/core";
import { Footer } from "~/components/Footer/Footer";
import { useDisclosure } from "@mantine/hooks";
import { type User } from "@prisma/client";
import Navigation from "../Navigation";
import classes from "./page.module.css";

export interface PageProps {
  children: React.ReactNode;
  seo?: {
    title: string;
    description: string;
  };
}
export function Page({ children, seo }: PageProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  return (
    <>
      <NextSeo
        title={seo?.title ?? "Page"}
        description={seo?.description ?? "Page description"}
      />
      <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
        <AppShell.Header>
          <Header
            toggle={toggleDrawer}
            close={closeDrawer}
            drawerOpened={drawerOpened}
          />
        </AppShell.Header>
        <AppShell.Main>{children}</AppShell.Main>
        <AppShell.Footer p="md">
          <Container fluid px="lg">
            <Footer />
          </Container>
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
export function DashboardPage({ children, seo }: PageProps & { user?: User }) {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, setOpened] = React.useState(false);
  const theme = useMantineTheme();
  return (
    <>
      <AppShell
        layout="alt"
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "md",
          collapsed: { desktop: !desktopOpened },
        }}
        padding={0}
      >
        <AppShell.Header
          style={{
            height: rem(60),
            border: "none",
            boxShadow: theme.shadows.sm,
          }}
        >
          <NextSeo
            title={seo?.title ?? "Page"}
            description={seo?.description ?? "Page description"}
          />
          <Container fluid py="sm" px="lg">
            <DashboardHeader
              desktopOpened={desktopOpened}
              toggleDesktop={toggleDesktop}
            />
          </Container>
        </AppShell.Header>
        <AppShell.Navbar>
          <Navigation onClose={() => setOpened(false)} />
        </AppShell.Navbar>
        <AppShell.Main>
          <Box py="lg" px="md" className={classes.main}>
            {children}
          </Box>
        </AppShell.Main>
        <AppShell.Footer p="md">
          <Container fluid px="lg">
            <Footer />
          </Container>
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
