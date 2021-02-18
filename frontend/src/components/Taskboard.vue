<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="flex flex-col space-y-10">
            <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
            <Taskmenu v-if="isNewTaskClicked" @task="(value) => createTask(value)" />
        </div>
        <select name="sort" v-model="sortval" @change="update_sort">
            <option value="">Sort By</option>
            <option value="priority">Priority</option>
            <option value="creation_date">Creation Date</option>
            <option value="completion_date">Completion Date</option>
        </select>
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
    var sortval = ref("")
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
        update_sort();
        isNewTaskClicked.value = false;
    };

    const openTaskMenu = () => {
        isNewTaskClicked.value = true;
    };

    const update_sort = () => {
        if (sortval.value == "priority")
            tasks.value.sort(task_sorter_priority);
        else
            if (sortval.value == "completion_date") 
                tasks.value.sort(task_sorter_completion);
            else
                tasks.value.sort(task_sorter_creation);
    };

    const task_sorter_priority = (a, b) => {
        if (a.priority < b.priority)
            return -1;
        if (a.priority > b.priority)
            return 1;

        return 0;
    };

    const task_sorter_completion = (a, b) => {
        if (a.completion_date < b.completion_date)
            return -1;
        if (a.completion_date > b.completion_date)
            return 1;

        return 0;
    };

    const task_sorter_creation = (a, b) => {
        if (a.creation_date < b.creation_date)
            return -1;
        if (a.creation_date > b.creation_date)
            return 1;

        return 0;
    };
</script>