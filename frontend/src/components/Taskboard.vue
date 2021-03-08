<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="flex flex-col space-y-10">
            <div class="flex flex-row space-x-5">
                <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
                <NewButton buttonName="New list" @click="openListMenu" class="mb-2 flex" />
            </div>
            <Taskmenu v-if="isNewTaskClicked" :listsnames="tasklistnames" @task="(value) => createTask(value)" />
            <Listmenu v-if="isNewListClicked" @list="(value) => createList(value)" />
        </div>
        <VueDraggableNext group="listgroup" :list="list" class="flex flex-row flex-wrap">
            <div v-for="list in taskslists" v-bind:key="list" class="text-center flex flex-col space-y-10 mb-10 mr-10 border-2 border-black">
                <Tasklist :title="list.title"
                          :tasks="list.tasks"
                          @sort="(value) => update_sort(value.sort_value, value.tasks)" />
            </div>
        </VueDraggableNext>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import NewButton from "./NewButton.vue";
    import Task from "./Task.vue";
    import Taskmenu from "./Taskmenu.vue";
    import Tasklist from "./Tasklist.vue";
    import Listmenu from "./listmenu.vue";
    import { VueDraggableNext } from 'vue-draggable-next';

    var taskslists = ref({});
    var tasklistnames = ref([]);

    var isNewTaskClicked = ref(false);
    var isNewListClicked = ref(false);

    var sort_value = ref("");
    sort_value.value = "manual";

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
        update_sort(sort_value.value, taskslists.value[task.value.listname].tasks);
    };

    const createList = (listname) => {
        if (tasklistnames.value.includes(listname)) {
            alert("This list already exist");
            return;
        }
            
        tasklistnames.value.push(listname);
        taskslists.value[listname] = {
            title: listname,
            tasks: []
        }
        isNewListClicked.value = false;
    };
    createList("Inbox");
    createList("Projects");
    createList("Next Actions");
    createList("Waiting For");

    const openTaskMenu = () => {
        isNewListClicked.value = false;
        isNewTaskClicked.value = !isNewTaskClicked.value;
    };

    const openListMenu = () => {
        isNewTaskClicked.value = false;
        isNewListClicked.value = !isNewListClicked.value;
    };

    // sorting
    const update_sort = (sorter, tasks) => {
        sort_value.value = sorter;
        if (sorter != "manual") {
            if (sorter == "priority")
                tasks.sort(task_sorter_priority);
            else
                if (sorter == "completion_date")
                    tasks.sort(task_sorter_completion);
                else
                    if (sorter == "creation_date")
                        tasks.sort(task_sorter_creation);
        }

    };

    const task_sorter_priority = (a, b) => {
        console.log(a, b)
        if (a.priority != "" && b.priority != "") {
            if (a.priority < b.priority)
                return -1;
            if (a.priority > b.priority)
                return 1;
        }
        if (a.priority != "" && b.priority == "") return -1
        if (b.priority != "" && a.priority == "") return 1
        if (b.priority == "" && a.priority == "") return 1
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