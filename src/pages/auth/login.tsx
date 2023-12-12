import { useRouter } from "next/router";
import { useEffect } from "react";
import { Page } from "~/components/Page/Page";
import { Login } from "~/modules/Auth/Login";
import { api } from "~/utils/api";

export default function LoginPage() {
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
      <Page seo={{ title: "Login", description: "Login to your account" }}>
        <Login />
      </Page>
    </>
  );
}
