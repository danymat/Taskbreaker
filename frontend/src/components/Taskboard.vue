<template>
    <div class="absolute left-0 top-5 text-center flex flex-col space-y-2 w-full h-full">
        <div class="flex flex-row space-x-3">
            <CleanButton buttonName="Clean Board" @click="() => cleanBoard()" />
            <ClickedButton buttonName="Show Projects" @isclicked="(isclicked) => showProject(isclicked)" :defaultClicked="true" />
            <ClickedButton buttonName="Today Tasks" @isclicked="(isclicked) => selectDate(isclicked)" :defaultClicked="false" />
            <ClickedButton buttonName="Only Not Completed" @isclicked="(isclicked) => showNotCompletedTasks(isclicked)" :defaultClicked="false" />
            <select name="context_select" v-model="context_select" @change="selectContextTasks(context_select)"
                class="border shadow-sm rounded-md w-25 bg-gray-100 focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            >
                <option value="">Any Context</option>
                <option v-for="name in listcontexts" v-bind:key="name" :value="name">{{ name }}</option>
            </select>
            <select name="project_select" v-model="project_select" @change="selectProjectTasks(project_select)"
            class="border shadow-sm rounded-md w-25 bg-gray-100 focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            >
                <option value="">Any project</option>
                <option v-for="name in listprojects" v-bind:key="name" :value="name">{{ name }}</option>
            </select>
            <CleanButton buttonName="Delete All Tasks" @click="() => deleteAllTasks()" />
            <CleanButton buttonName="Complete All Tasks" @click="() => completeAllTasks()" />
        </div>

        <Taskmenu class="w-5/6" :listsnames="listnames" :contexts="listcontexts" :projects="listprojects" @task="(value) => createTask(value[0],value[1])" />


        <div class="flex flex-row w-10/12 h-5/6 space-x-1">
            <div v-if="listprojects" class="w-3/12 bg-gray-200 shadow-sm rounded-xl space-y-4 overflow-y-auto border border-gray-300" :class="{hidden: hideprojects}">
                <button class="bg-gray-500 px-3 text-white shadow-sm rounded-full font-semibold text-3xl mt-2">Projects</button>
                <div>
                    <Project v-for="proj in listprojects" v-bind:key="proj"
                             :title="proj"
                             :tasks="listtasksofprojects[proj]" />
                </div>
            </div>
            <div class="w-full bg-gray-200 shadow-sm rounded-xl space-y-4 overflow-y-auto border border-gray-300">
                <VueDraggableNext v-model="boardlists" group="listgroup" class="flex flex-row flex-wrap min-h-full">
                    <Tasklist v-for="list in boardlists" v-bind:key="list" class="cursor-move"
                              :title="list.title"
                              :tasks="list.tasks"
                              :hideme="false"
                              :selector="selectors"
                              @sort="(value) => update_sort(value.sort_value, value.tasks)"
                              @complete="(value) => completeTask(value)"/>
                </VueDraggableNext>
            </div>
        </div>
    </div>
    <div class="absolute -right-96 flex flex-col w-4/12 h-full z-10 translate-x-64 transition transform duration-300 hover:-translate-x-64">
        <div class="w-full h-full bg-gray-200 shadow-sm rounded-xl space-y-4 overflow-y-auto m-3 border border-gray-300">
            <VueDraggableNext v-model="sidedlists" group="listgroup" class="flex flex-col flex-wrap min-h-full">
                <Tasklist v-for="list in sidedlists" v-bind:key="list" class="cursor-move"
                          :title="list.title"
                          :tasks="list.tasks"
                          :selector="selectors"
                          :hideme="true"
                          @sort="(value) => update_sort(value.sort_value, value.tasks)" />
            </VueDraggableNext>
        </div>
    </div>
</template>
<style>
    @import './../assets/styles/scrollbar.css';
</style>
<script setup>
    import { ref } from "vue";
    import NewButton from "./NewButton.vue";
    import CleanButton from './CleanButton.vue';
    import Task from "./Task.vue";
    import Taskmenu from "./Taskmenu.vue";
    import Tasklist from "./Tasklist.vue";
    import Listmenu from "./listmenu.vue";
    import ClickedButton from "./ClickedButton.vue";
    import { VueDraggableNext } from 'vue-draggable-next';
    import { getUserTasks, createUserTask, deleteUserTask, completeUserTask, addContext, addProject } from '../api/users';
    import store from './../store';
    import Project from './Project.vue';

    var sidedlists = ref([]);  //array of list on side board
    var boardlists = ref([]);  //array of tasks on main board
    var all_lists = ref({}); //array of lists {listname: arrayoftasks, }
    var listnames = ref([]);
    var context_select = ref("");
    var listcontexts = ref([]);
    var project_select = ref("");
    var listprojects = ref([]);
    var listtasksofprojects = ref({}); // used to pass tasks of a project to the project component
    var selectors = ref({}); //selectors to hide tasks
    selectors.value = {
        contexts: [],
        dates: [],
        projects: [],
        completedonly: false
    }
    var hideprojects = ref(false)

    //get all tasks from the server for this user
    async function getAllTasks() {
        try {
            const resp = await getUserTasks({ email: store.getters.email })
            const data = resp.data
            if (data.contexts.length != 0) {
                listcontexts.value = data.contexts.map(x => x.title)
            }

            if (data.projects.length != 0) {
                listprojects.value = data.projects.map(x => x.title)
                for (var project of listprojects.value) {
                    listtasksofprojects.value[project] = []
                }
            }

            if (data.tasks.length != 0) {
                for (var taski in data.tasks) {
                    all_lists.value['Inbox'].push(data.tasks[taski]) //adding task to inbox list

                    if ((data.tasks[taski].project != '') && (data.tasks[taski].project != null))
                        listtasksofprojects.value[data.tasks[taski].project].push(data.tasks[taski])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function createTask(task, listname) {
        if (Object.keys(all_lists.value).includes(listname.value)) {
            try {
                const data = await createUserTask(task.value)

                all_lists.value[listname.value].push(data.task)

                // filling listcontext
                for (var context of data.task.contexts) {
                    if (!listcontexts.value.includes(context)) {
                        listcontexts.value.push(context)
                        addContext(context)
                    }
                }

                // filling listprojects
                if (!listprojects.value.includes(data.task.project) && (data.task.project != '') && (data.task.project != null)) {
                    listprojects.value.push(data.task.project)
                    listtasksofprojects.value[data.task.project] = []
                    addProject(data.task.project)
                }
                if ((data.task.project != '') && (data.task.project != null))
                    listtasksofprojects.value[data.task.project].push(data.task)
            } catch (error) {
                return;
            }
        }
    }

    //create new list
    const createList = (listname) => {
        if (listnames.value.includes(listname)) {
            alert("This list already exist");
            return;
        }

        all_lists.value[listname] = []
        boardlists.value.push({ title: listname, tasks: all_lists.value[listname] })
        listnames.value.push(listname)
    }

    const showProject = (isclicked) => {
        if (isclicked) {
            hideprojects.value = false
        } else {
            hideprojects.value = true
        }
    }

    // store all list on the side and leave name list
    const cleanBoard = (name = '') => {
        for (var elt = boardlists.value.length - 1; elt>=0; elt--) {
            if (boardlists.value[elt].title != name) {
                sidedlists.value.push(boardlists.value[elt])
                boardlists.value.splice(elt, 1)
            }
        }

        if (boardlists.value.length == 0) {
            for (var elt = 0; elt < sidedlists.value.length; elt++) {
                if (sidedlists.value[elt].title == name) {
                    boardlists.value.push(sidedlists.value[elt])
                    sidedlists.value.splice(elt, 1)
                }
            }
        }
    }

    //delete all tasks
    const deleteAllTasks = () => {
        for (var list in all_lists.value) {
            for (var task of all_lists.value[list]) {
                deleteUserTask(task.uuid)
            }
        }
    }

    //completeAllTasks
    const completeAllTasks = () => {
        for (var list in all_lists.value) {
            for (var task of all_lists.value[list]) {
                completeUserTask(task.uuid)
            }
        }
    }

    async function completeTask(uuid) {
        try {
            await completeUserTask(uuid)
            for (var list in all_lists.value) {
                for (var task of all_lists.value[list]) {
                    if (task.uuid == uuid) {
                        task.completionDate = Date.now()
                    }
                }
            }
        } catch (error) {
            return;
        }
    }

    // change selector value for the date, only works with today atm
    const selectDate = (isclicked) => {
        //only today for now but date should be selected from calendar and be a Date()
        const today = new Date()
        selectors.value.dates = []
        if (isclicked) {
            selectors.value.dates.push(today)
        }
    }

    // change selector value for context only works with one context at the time
    const selectContextTasks = (context) => {
        selectors.value.contexts = []  //should be changed when multiple contexts selected but not the case atm
        if (context != '') {
            selectors.value.contexts.push(context)
        }
    }

    // change selector value for project only works with one project at the time
    const selectProjectTasks = (project) => {
        selectors.value.projects = []  //should be changed when multiple project selected but not the case atm
        if (project != '') {
            selectors.value.projects.push(project)
        }
    }

    // change selector value to display only not compeletd task
    const showNotCompletedTasks = (iscompletedonly) => {
        selectors.value.completedonly = iscompletedonly
    }

    // return true if selector empty and all value should be set to true
    const isSelectorEmpty = () => {
        if ((selectors.value.dates.length == 0) && (selectors.value.contexts.length == 0) && (selectors.value.projects.length == 0) && (selectors.value.completedonly == false))
            return true
        else return false
    }

    // take tasks from name list and put them into inbox (not used anymore but could be useful)
    const clearList = (name) => {
        for (var task = all_lists.value[name].length-1; task >= 0; task--) {
            all_lists.value['Inbox'].push(all_lists.value[name][task])
            all_lists.value[name].pop()
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
    createList("Next Actions");
    createList("Waiting For");
    createList("Maybe");
    getAllTasks();
</script>