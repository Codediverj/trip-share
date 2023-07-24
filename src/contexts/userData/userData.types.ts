import { User } from "@/app/api/user/user.types";

export type UserDataStore = User;

export const initUserDataStore = (): UserDataStore => {
  return { userId: "", nickname: "", profileImage: "", createdAt: new Date() };
};
