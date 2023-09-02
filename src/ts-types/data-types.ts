import { Ref } from "vue";

export type StringType = Record<"title" | "url" | "id" | "qr", string>;
export type QrType = StringType & { logo?: string };
export type QrListType = QrType[];

export type ExtensionType = Ref<{
  png: boolean;
  svg: boolean;
  jpeg: boolean;
}>;

export type QueryParamType = {
  query: string;
  param: string;
  id: string;
};
