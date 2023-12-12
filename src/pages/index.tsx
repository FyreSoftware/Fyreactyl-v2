import { Page } from "~/components/Page/Page";
import { Welcome } from "~/modules/Welcome";

export default function Home() {
  return (
    <>
      <Page seo={{ title: "Home", description: "Your personal dashboard" }}>
        {" "}
        <Welcome />
      </Page>
    </>
  );
}
