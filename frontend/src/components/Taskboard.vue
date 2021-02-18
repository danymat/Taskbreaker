<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="flex flex-col space-y-10">
            <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
            <Taskmenu v-if="isNewTaskClicked" @task="(value) => createTask(value)" />
        </div>

        <div class="space-y-2">
            <div v-for="task in tasks" v-bind:key="task">
                <Task :priority="task.priority"
                      :completion_date="task.completion_date"
                      :creation_date="task.creation_date"
                      :description="task.description"
                      :context="task.context"
                      :project="task.project"
                      :special="task.special" />
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
            priority: task.value.priority,
            completion_date: task.value.completion_date,
            creation_date: task.value.creation_date,
            description: task.value.description,
            context: task.value.context,
            project: task.value.project,
            special: task.value.special
        });
        isNewTaskClicked.value = false;
    };

    const openTaskMenu = () => {
        isNewTaskClicked.value = true;
    };
</script>