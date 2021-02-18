<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="flex flex-col space-y-10">
            <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
            <Taskmenu v-if="isNewTaskClicked" @task="(value) => createTask(value)" />
        </div>

        <div class="space-y-2">
            <div v-for="task in tasks" v-bind:key="task">
                <Task :title="task.title"
                      :context="task.context"
                      :project="task.project"
                      :notification="task.hasNotification" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import NewButton from "./NewButton.vue";
    import Task from "./Task.vue";
    import Taskmenu from "./Taskmenu.vue";

    var tasks = ref([]);
    var isNewTaskClicked = ref(false)

    const createTask = (task) => {
        tasks.value.push({
            title: task.value.title,
            context: task.value.context,
            project: task.value.project,
            hasNotification: false,
        });
        isNewTaskClicked.value = false;
    };

    const openTaskMenu = () => {
        isNewTaskClicked.value = true;
    };
</script>