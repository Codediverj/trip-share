"use client";

//components
import HomeHeader from "../../components/HomeHeader/HomeHeader";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";

// export const metadata = {
//   title: "TripShare",
//   description: "Share your trip plan",
// };

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const randomImage =
    "https://images.unsplash.com/photo-1543158266-0066955047b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  const randomName = "Name";

  const userData = useUserDataStore();
  console.log(userData);

  return (
    <>
      <header>
        <HomeHeader randomImage={randomImage} randomName={randomName} />
      </header>
      {children}
    </>
  );
}
