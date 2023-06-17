import Image from "next/image";
import "../globals.scss";

export const metadata = {
  title: "TripShare",
  description: "Share your trip plan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>이게 레이아웃이야</header>
        {children}
      </body>
    </html>
  );
}
