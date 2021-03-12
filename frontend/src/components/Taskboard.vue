<template>
    <div class="absolute left-0 top-5 text-center flex flex-col space-y-10 w-9/12 h-full">
        <div class="flex flex-row space-x-5">
                <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
                <NewButton buttonName="New list" @click="openListMenu" class="mb-2 flex" />
                <NewButton buttonName="Today Tasks" @click="" class="mb-2 flex" />
                <NewButton buttonName="Clean Board" @click="cleanBoard" class="mb-2 flex" />
        </div>
        <div class="relative w-9/12 mx-auto">
            <Taskmenu v-if="isNewTaskClicked" :listsnames="tasklistnames" @task="(value) => createTask(value)" @close="isNewTaskClicked=false" />
            <Listmenu v-if="isNewListClicked" @list="(value) => createList(value)" @close="isNewListClicked=false" />
        </div>
        <div class="absolute w-full min-h-3/4 bg-blue-200 z-0">
            <VueDraggableNext v-model="taskslists" group="listgroup" class="flex flex-row flex-wrap min-h-full">
                <Tasklist v-for="list in taskslists" v-bind:key="list"
                          :title="list.title"
                          :tasks="list.tasks"
                          :hideme="false"
                          @sort="(value) => update_sort(value.sort_value, value.tasks)" />
            </VueDraggableNext>
        </div>
    </div>
    <div class="absolute top-5 right-5 flex flex-col w-2/12 h-full">
        <div class="w-full h-full bg-gray-200">
            <VueDraggableNext v-model="storedlist" group="listgroup" class="flex flex-col flex-wrap min-h-full">
                <Tasklist v-for="list in storedlist" v-bind:key="list"
                          :title="list.title"
                          :tasks="list.tasks"
                          :hideme="true"
                          @sort="(value) => update_sort(value.sort_value, value.tasks)" />
            </VueDraggableNext>
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
    import { VueDraggableNext } from 'vue-draggable-next';

    var storedlist = ref([]);
    var taskslists = ref([]);
    var tasklistnames = ref([]);

    var isNewTaskClicked = ref(false);
    var isNewListClicked = ref(false);

    var sort_value = ref("");
    sort_value.value = "manual";

    const cleanBoard = () => {
        for (var elt in taskslists.value) {
            storedlist.value.push({
                title: taskslists.value[elt].title,
                tasks: taskslists.value[elt].tasks
            })
        }
        taskslists.value = []
    }

    const createTask = (task) => {
        var elt = {}
        for (elt in taskslists.value) {
            if (taskslists.value[elt].title == task.value.listname) {
                taskslists.value[elt].tasks.push({
                    priority: task.value.priority,
                    completion_date: task.value.completion_date,
                    creation_date: task.value.creation_date,
                    description: task.value.description,
                    context: task.value.context,
                    project: task.value.project,
                    special: task.value.special
                });
                isNewTaskClicked.value = false;
                update_sort(sort_value.value, taskslists.value[elt].tasks);
            }
        }
    };

    const createList = (listname) => {
        if (tasklistnames.value.includes(listname)) {
            alert("This list already exist");
            return;
        }
            
        tasklistnames.value.push(listname);
        taskslists.value.push({
            title: listname,
            tasks: []
        })
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