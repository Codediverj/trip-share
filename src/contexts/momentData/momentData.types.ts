export type MomentDataStore = {
  id: number;
  planId: string;
  title: string;
  momentDate: Date;
  memo: string;
  momentImage?: string;
  writer?: {
    writerUserId: string;
    writerNickName?: string;
    writerImage?: string;
  };
}[];

export const initMomentDataStore = (): MomentDataStore => {
  return [];
};
