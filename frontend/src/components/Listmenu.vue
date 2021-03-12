<template>
    <div class="absolute bg-green-200 border-2 w-full z-10" :class="bdcolor">
        <form class="flex flex-row space-y-4" onsubmit="event.preventDefault()">
            <div class="m-0">
                <input type="text" placeholder="Name" v-model="listname" />
                <div class="flex flex-row">
                    <NewButton buttonName="Create List" class="p-2" @click="createList" />
                    <img :src="'/sprites/wizzard/run_'+img_number+'.png'" width="40" height="37" />
                </div>
            </div>
        </form>
        <button class="absolute right-3 top-3 bg-red-600 w-5 h-5" v-on:click="emit('close', true)" />
    </div>
</template>
<script setup>
    import { ref, defineEmit, defineProps } from "vue";
    import NewButton from "./NewButton.vue";

    const img_number = ref(1);
    setInterval(change_img, 100);
    function change_img() {
        img_number.value = (img_number.value) % 4 + 1
    }

    var bdcolor = ref("")
    var listname = ref("");

    const emit = defineEmit(["list", 'close']);

    const createList = () => {
        if (listname.value.length != 0) {
            emit("list", listname.value);
        } else {
            bdcolor.value = "border-red-600";
        }
    }
</script>