import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import SheetViewer from "@/components/cast/SheetViewer";
import Effects from "@/components/Effects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MemoryCard from "@/components/MemoryCard";
import { FOOTER, SITE_NAME } from "../../data/site";
import "./globals.css";

// The original loads 300 as well: body copy is set in Poppins Light.
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  // No metric-adjusted fallback face: it changes line boxes slightly versus the original font stack.
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: FOOTER.about,
};

export const viewport: Viewport = {
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#0B0A09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Effects />
        <Header />
        {children}
        <Footer />
        <SheetViewer />
        <MemoryCard />
      </body>
    </html>
  );
}
