import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { theme } from "@/lib/theme";
import { NotificationsProvider } from "@mantine/notifications";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
    <NotificationsProvider position="top-right">
      <Component {...pageProps} />
    </NotificationsProvider>
  </MantineProvider>
);

export default MyApp;
