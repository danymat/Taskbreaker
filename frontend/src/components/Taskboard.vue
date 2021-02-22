<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="flex flex-col space-y-10">
            <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
            <Taskmenu v-if="isNewTaskClicked" :listsnames="tasklistnames" @task="(value) => createTask(value)" />
            <NewButton buttonName="New list" @click="openListMenu" class="mb-2 flex" />
            <Listmenu v-if="isNewListClicked" @list="(value) => createList(value)" />
        </div>
        <div class="flex flex-row space-x-10">
            <div v-for="list in taskslists" v-bind:key="list">
                <Tasklist :title="list.title"
                          :tasks="list.tasks" />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import NewButton from "./NewButton.vue";
    import Task from "./Task.vue";
    import Taskmenu from "./Taskmenu.vue";
    import Tasklist from "./Tasklist.vue";
    import Listmenu from "./listmenu.vue";

    var taskslists = ref({});
    var tasklistnames = ref([]);
    var isNewTaskClicked = ref(false)
    var isNewListClicked = ref(false)

    const createTask = (task) => {
        taskslists.value[task.value.listname].tasks.push({
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

    const createList = (listname) => {
        tasklistnames.value.push(listname.value);
        taskslists.value[listname.value] = {
            title: listname.value,
            tasks: []
        }
        isNewListClicked.value = false;
    };

    const openTaskMenu = () => {
        isNewListClicked.value = false;
        isNewTaskClicked.value = true;
    };

    const openListMenu = () => {
        isNewTaskClicked.value = false;
        isNewListClicked.value = true;
    };
</script>