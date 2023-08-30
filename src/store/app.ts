import { defineStore } from "pinia";
import { ref } from "vue";
import { QrListType, QrType } from "@/ts-types/data-types";

export const useStore = defineStore("qr", () => {
  const generatedQr = ref("");
  const list = ref<QrListType>([]);

  const qrHistory = localStorage.getItem("qrHistory");
  if (qrHistory) {
    list.value = JSON.parse(qrHistory);
  }

  function saveQr(obj: QrType) {
    list.value.push(obj);
  }

  return { generatedQr, saveQr, list };
});
