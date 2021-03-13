<template>
    <div class="absolute left-0 top-5 text-center flex flex-col space-y-10 w-full h-full">
        <div class="flex flex-row space-x-5">
                <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
                <NewButton buttonName="New list" @click="openListMenu" class="mb-2 flex" />
                <NewButton buttonName="Today Tasks" @click="todayTasks" class="mb-2 flex" />
                <NewButton buttonName="Clean Board" @click="cleanBoard" class="mb-2 flex" />
        </div>
        <div class="relative w-9/12 mx-auto">
            <Taskmenu v-if="isNewTaskClicked" :listsnames="listnames" @task="(value) => createTask(value[0],value[1])" @close="isNewTaskClicked=false" />
            <Listmenu v-if="isNewListClicked" @list="(value) => createList(value)" @close="isNewListClicked=false" />
        </div>
        <div class="absolute w-11/12 h-5/6 bg-blue-200 overflow-y-auto">
            <VueDraggableNext v-model="boardlists" group="listgroup" class="flex flex-row flex-wrap min-h-full">
                <Tasklist v-for="list in boardlists" v-bind:key="list"
                          :title="list.title"
                          :tasks="list.tasks"
                          :hideme="false"
                          @sort="(value) => update_sort(value.sort_value, value.tasks)" />
            </VueDraggableNext>
        </div>
    </div>
    <div class="absolute top-5 right-0 flex flex-col w-1/12 h-full z-30 hover:w-2/12">
        <div class="w-full h-full bg-gray-200 overflow-y-auto">
            <VueDraggableNext v-model="sidedlists" group="listgroup" class="flex flex-col flex-wrap min-h-full">
                <Tasklist v-for="list in sidedlists" v-bind:key="list"
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
    import { getUserTasks, createUserTask } from '../api/users';
    import store from './../store';

    var sidedlists = ref([]);  //array of list on side board
    var boardlists = ref([]);  //array of tasks on main board
    var all_lists = ref({}); //array of lists {listname: arrayoftasks, }
    var listnames = ref([]);

    var isNewTaskClicked = ref(false);
    var isNewListClicked = ref(false);

    //get all tasks from the server for this user
    async function getAllTasks() {
        const data = await getUserTasks({ email: store.getters.email })
        if (data.tasks.length != 0) {
            for (var taski in data.tasks) {
                all_lists.value['Inbox'].push(data.tasks[taski]) //adding task to inbox list
            } 
        } else {
            alert('no tasks :'+data.message)
        }
    }

    async function createTask(task, listname) {
        if (Object.keys(all_lists.value).includes(listname.value)) {
            const data = await createUserTask(task.value)
            if (typeof(data) == 'undefined') {
                return;
            }
            all_lists.value[listname.value].push(data.task)
            isNewTaskClicked.value = false;
        }
    };

    //create new list
    const createList = (listname) => {
        if (listnames.value.includes(listname)) {
            alert("This list already exist");
            return;
        }
            
        all_lists.value[listname] = []
        isNewListClicked.value = false;
        boardlists.value.push({ title: listname, tasks: all_lists.value[listname] })
        listnames.value.push(listname)
    };

    const openTaskMenu = () => {
        isNewListClicked.value = false;
        isNewTaskClicked.value = !isNewTaskClicked.value;
    }

    const openListMenu = () => {
        isNewTaskClicked.value = false;
        isNewListClicked.value = !isNewListClicked.value;
    }

    // store all list on the side
    const cleanBoard = () => {
        for (var elt in boardlists.value) {
            sidedlists.value.push(boardlists.value[elt])
        }
        boardlists.value = []
    }

    //store all today tasks in a list today
    const todayTasks = () => {
        if (!listnames.value.includes('today')) {
            createList('today')
        }

        cleanBoard()
        for (var list in sidedlists.value) {
            if (sidedlists.value[list].title == 'today') {
                boardlists.value.push(sidedlists.value[list])
                sidedlists.value.splice(parseInt(list), 1)
            }
        }

        for (var tasks in all_lists.value) { 
            var valtosplice = []
            for (var task in all_lists.value[tasks].reverse()) {
                var taskDay = new Date(all_lists.value[tasks][task].createdDate)
                var today = new Date()
                if ((taskDay.getMonth() == today.getMonth()) && (taskDay.getDate() == today.getDate()) && (taskDay.getFullYear() == today.getFullYear()) && (tasks != 'today')) {
                    all_lists.value['today'].push(all_lists.value[tasks][task])
                    valtosplice.push(task)
                } 
            }
            valtosplice = valtosplice.sort().reverse()
            for (var index in valtosplice) {
                all_lists.value[tasks].splice(valtosplice[index], 1)
            }
        }
    }

    // sorting
    const update_sort = (sorter, tasks) => {
        if (sorter != "manual") {
            if (sorter == "priority")
                tasks.sort(task_sorter_priority);
            else
                if (sorter == "creation_date")
                    tasks.sort(task_sorter_creation);
        }

    };

    const task_sorter_priority = (a, b) => {
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

    const task_sorter_creation = (a, b) => {
        var adate = new Date(a.createdDate)
        var bdate = new Date(b.createdDate)
        if (adate < bdate)
            return -1;
        if (adate > bdate)
            return 1;

        return 0;
    };


    createList("Inbox");
    createList("Projects");
    createList("Next Actions");
    createList("Waiting For");
    getAllTasks()
</script>