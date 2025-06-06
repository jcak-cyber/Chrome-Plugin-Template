import { defineStore } from "pinia";
import { ref } from "vue";

// 这只是一个测试例子，请改成你自己的文件存储逻辑
export const useFileStore = defineStore("test-exec", () => {
  const testVal = ref("1");

  const setTest = (payload: "0" | "1") => {
    testVal.value = payload;
  };

  return { testVal, setTest };
});
