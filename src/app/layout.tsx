import Image from "next/image";
import "./globals.css";
import styles from "./page.module.css";
import { faker } from "@faker-js/faker";

//components
import HomeHeader from "./components/HomeHeader";

export const metadata = {
  title: "TripShare",
  description: "Share your trip plan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const randomImage = faker.image.url();
  const randomName = faker.person.firstName();

  return (
    <html lang="en">
      <body>
        <header>
          <HomeHeader randomImage={randomImage} randomName={randomName} />
        </header>
        {children}
      </body>
    </html>
  );
}
