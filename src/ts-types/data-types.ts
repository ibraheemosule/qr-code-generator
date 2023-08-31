export type QrType = Record<"title" | "url" | "id" | "qr", string>;
export type QrListType = QrType[];

export type QueryParamType = {
  query: string;
  param: string;
  id: string;
};
