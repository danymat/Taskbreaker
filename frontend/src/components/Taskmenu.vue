<template>
    <div class="border-2" :class="bdcolor">
        <form class="flex flex-row space-y-4" onsubmit="event.preventDefault()">
            <div class="m-0">
                <input type="text" placeholder="Taskname" v-model="task.title" />
                <input type="text" placeholder="Context" v-model="task.context" />
                <input type="text" placeholder="Project" v-model="task.project" />
                <NewButton buttonName="Create Task" class="p-2" @click="createTask" />
            </div>
        </form>
    </div>
</template>
<script setup>
    import { ref, defineEmit } from "vue";
    import NewButton from "./NewButton.vue";

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