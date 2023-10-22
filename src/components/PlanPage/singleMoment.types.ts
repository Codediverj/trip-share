export type MomentDataType = {
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
};
