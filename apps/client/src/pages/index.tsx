import {
  Button,
  Container,
  createStyles,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { GetServerSideProps } from "next";
import { Footer } from "@/components/ui/Footer";
import { Meta } from "@/layouts/Meta";
import nookies from "nookies";
import { userAction } from "@/lib/actions";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));
const Index = (props: any) => {
  console.log(props.user);
  const { classes } = useStyles();
  return (
    <>
      <Meta
        title="Company | Welcome"
        description="Welcome to your personal dashboard!"
      />
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Welcome to your personal dashboard
              </Title>
              <Text color="dimmed" mt="md">
                On your dashboard you manage your resources, servers and much
                more.
              </Text>

              <Group mt={100}>
                <Button
                  radius="xl"
                  size="md"
                  component="a"
                  href="/auth/login"
                  className={classes.control}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  component="a"
                  href="/auth/signup"
                  className={classes.control}
                >
                  Create an account
                </Button>
              </Group>
            </div>
            <Image
              src={"/assets/images/home.svg"}
              alt="h"
              className={classes.image}
            />
          </div>
        </Container>
      </div>
      <Footer links={[{ label: "Privacy Policy", link: "/" }]} />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const user = await userAction(cookies.token as string);
  console.log(user);
  // No need to thank me for this auth system :D
  return {
    props: {
      user: user?.username ? user : null,
    },
  };
};
export default Index;
