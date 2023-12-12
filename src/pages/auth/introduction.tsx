import { useRouter } from "next/router";
import { useEffect } from "react";
import { Page } from "~/components/Page/Page";
import { Introduction } from "~/modules/Auth/Introduction";
import { api } from "~/utils/api";

export default function IntroPage() {
  const router = useRouter();
  const user = api.auth.user.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    async () => {
      if (user.isSuccess) {
        await router.push("/dashboard");
      }
    };
    return;
  }, [user]);
  return (
    <>
      <Page seo={{ title: "Register", description: "Create an account!" }}>
        <Introduction />
      </Page>
    </>
  );
}
