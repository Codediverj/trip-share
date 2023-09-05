export type SinglePlan = {
  order: number;
  placeFromId: string;
  placeFromName: string;
  placeToId?: string;
  placeToName?: string;
  note?: string;
  links?: string;

  isGroupActivity: boolean;
  expense: number;
  havePaid: boolean;
};

// User: {
//   userId: string;
//   nickname: string;
//   profileImage: string;
//   createdAt: Date;
//   email: string;
//   travelerCode: string;
// }[];
