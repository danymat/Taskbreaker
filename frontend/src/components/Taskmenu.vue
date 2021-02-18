<template>
    <div class="border-2" :class="bdcolor">
        <form class="flex flex-row space-y-4" onsubmit="event.preventDefault()">
            <div class="m-0">
                <input type="text" placeholder="Taskname *Required*" v-model="task.title" />
                <input type="text" placeholder="Context" v-model="task.context" />
                <input type="text" placeholder="Project" v-model="task.project" />
                <div class="flex flex-row">
                    <NewButton buttonName="Create Task" class="p-2" @click="createTask" />
                    <img :src="'/sprites/wizzard/run_'+img_number+'.png'" width="40" height="37" />
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
    import { ref, defineEmit } from "vue";
    import NewButton from "./NewButton.vue";
    const img_number = ref(1);
    setInterval(change_img, 100);
    function change_img() {
        img_number.value = (img_number.value) % 4 + 1
    }

    var bdcolor = ref("")
    var task = ref({
        title: "",
        context: "",
        project: "",
        hasNotification: false
    });

    const emit = defineEmit(["task"]);

    const createTask = () => {
        if (task.value.title.length == 0) {
            bdcolor.value = "border-red-600";
        } else {
            emit("task", task)
        }
    }
</script>