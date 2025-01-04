import FallingFlowers from "@/components/anime/falling-flowers";
import "../styles/index.scss";
import MainLayout from "@/layout/main-layout";
import Fireworks from "@/components/anime/fireworks";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || MainLayout;
  return (
    <>
      <Layout>
        <Component {...pageProps} />
        {/* <FallingFlowers />
        <Fireworks /> */}
      </Layout>
    </>
  );
}
