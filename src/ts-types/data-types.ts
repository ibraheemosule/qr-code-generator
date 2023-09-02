export type StringType = Record<"title" | "url" | "id" | "qr", string>;
export type QrType = StringType & { logo?: string };
export type QrListType = QrType[];

export type QueryParamType = {
  query: string;
  param: string;
  id: string;
};
