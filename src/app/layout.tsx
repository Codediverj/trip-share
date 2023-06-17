import "./globals.scss";
import { faker } from "@faker-js/faker";

//components
import HomeHeader from "./components/HomeHeader/HomeHeader";

//Font
import {Poppins, Inter } from 'next/font/google';
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--poppins',
})
const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--inter',
})

export const cls = (...classnames: string[]) => {
  return classnames.join(' ');
}

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
  console.log(randomImage);
  const randomName = faker.person.firstName();

  return (
    <html lang="en">
      <body>
        <div className={cls(poppins.variable, inter.variable)}>
        <header>
          <HomeHeader randomImage={randomImage} randomName={randomName} />
        </header>
        {children}
        </div>
      </body>
    </html>
  );
}
