//components
import HomeHeader from "../../components/HomeHeader/HomeHeader";

export const metadata = {
  title: "TripShare",
  description: "Share your trip plan",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <HomeHeader />
      </header>
      {children}
    </>
  );
}
