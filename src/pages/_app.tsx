import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { defaultTheme } from "~/utils/theme";
import { Open_Sans } from "next/font/google";
import "../styles/globals.css";
import "mantine-datatable/styles.layer.css";
import { ModalsProvider } from "@mantine/modals";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={openSans.className}>
      <MantineProvider theme={defaultTheme} defaultColorScheme="auto">
        <ModalsProvider>
          <Notifications />
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
