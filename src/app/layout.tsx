import "./globals.scss";
import { PopupContextProvider } from "../contexts/popup/PopupContext";

//Font
import { Poppins, Inter } from "next/font/google";
import { cx } from "../utils/classname.utils";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins",
});
const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});

export const metadata = {
  title: "TripShare",
  description: "Share your trip plan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PopupContextProvider>
          <div className={cx(poppins.variable, inter.variable)}>{children}</div>
        </PopupContextProvider>
      </body>
    </html>
  );
}
