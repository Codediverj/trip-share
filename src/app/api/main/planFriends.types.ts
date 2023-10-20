export type planFriends = {
  user_id: string;
  User: {
    created_at: string;
    email: string;
    nickname: string;
    profile_image: string | null;
    traveler_code: string;
    user_id: string;
  } | null;
}[];
