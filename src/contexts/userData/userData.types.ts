import { User } from "@/app/api/user/user.types";

export type UserDataStore = User;

export const initUserDataStore = (): UserDataStore => {
  return {
    userId: "",
    nickname: "",
    profileImage: "/profile_default_image.svg",
    createdAt: new Date(),
    email: "",
    travelerCode: "000000000000",
  };
};
