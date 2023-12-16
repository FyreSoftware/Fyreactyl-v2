import classes from "./logo.module.css";
import {
  Group,
  Text,
  UnstyledButton,
  type UnstyledButtonProps,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  href?: string;
  size?: number;
} & UnstyledButtonProps;

const Logo = ({ href, size, ...others }: LogoProps) => {
  return (
    <UnstyledButton
      className={classes.logo}
      component={Link}
      href={href ?? "/"}
      {...others}
    >
      <Group gap="xs">
        <Image
          src="/logo.png"
          height={size ?? 24}
          width={size ?? 24}
          alt="Fyreactyl logo"
          style={{
            borderRadius: "100%",
          }}
        />
        <Text fw={700}>Fyreactyl</Text>
      </Group>
    </UnstyledButton>
  );
};

export default Logo;
