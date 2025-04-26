import {defineStore} from 'pinia';
import {ref} from 'vue'

export const useConfigStore = defineStore("config", () => {
    const someVar = ref("默认值");
    const someNum = ref(0);

    const someFunc = () => {
        someNum.value += 1
    }

    return {
        someVar,
        someNum,
        someFunc
    };
}, {
    persist: {
        pick: ["someVar"]
    }
})
