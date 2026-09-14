import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import PageTransition from "@/components/ui/PageTransition";

export default function SiteLayout({ children }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <CartDrawer />
    </>
  );
}
