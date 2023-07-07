import "../globals.scss";
import { faker } from "@faker-js/faker";

//components
import HomeHeader from "../components/HomeHeader/HomeHeader";

export const metadata = {
  title: "TripShare",
  description: "Share your trip plan",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const randomImage = faker.image.url();
  console.log(randomImage);
  const randomName = faker.person.firstName();

  return (
    <>
      <header>
        <HomeHeader randomImage={randomImage} randomName={randomName} />
      </header>
      {children}
    </>
  );
}
