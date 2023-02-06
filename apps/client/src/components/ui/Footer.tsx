import { Anchor, Container, createStyles, Group, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 300,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export function Footer({ links }: FooterSimpleProps) {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor<"a"> color="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>
          © {new Date().getFullYear()} Fyre Software. All rights reserved.
        </Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
