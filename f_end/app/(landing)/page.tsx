import NoAuthNavbar from "@/components/navbars/no_auth";
import Branding from "./_components/branding";
import Features from "./_components/features";

export default function Home() {
  return (
    <main>
      <NoAuthNavbar />
      <Branding />
      <Features />
    </main>
  );
}
