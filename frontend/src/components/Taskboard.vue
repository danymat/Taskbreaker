<template>
    <div class="absolute left-0 top-5 text-center flex flex-col space-y-10 w-full h-full">
        <div class="flex flex-row space-x-5">
            <NewButton buttonName="New Task" @click="openTaskMenu" class="mb-2 flex" />
            <NewButton buttonName="Clean Board" @click="() => cleanBoard()" class="mb-2 flex" />
            <input type="checkbox" id="showProjects" name="showProjectsSelect" value="project" @change="(event) => showProject(event)">
            <label for="showProjectsSelect">Hide Projects</label>
            <input type="checkbox" id="todayTaskSelect" name="todayTaskSelect" value="today" @change="(event) => selectDate(event)">
            <label for="todayTaskSelect">Today Tasks</label>
            <select name="context_select" v-model="context_select" @change="selectContextTasks(context_select)">
                <option value="">Any Context</option>
                <option v-for="name in listcontexts" v-bind:key="name" :value="name">{{ name }}</option>
            </select>
            <select name="project_select" v-model="project_select" @change="selectProjectTasks(project_select)">
                <option value="">Any project</option>
                <option v-for="name in listprojects" v-bind:key="name" :value="name">{{ name }}</option>
            </select>
        </div>
        <div class="relative w-full mx-auto">
            <Taskmenu v-if="isNewTaskClicked" :listsnames="listnames" @task="(value) => createTask(value[0],value[1])" @close="isNewTaskClicked=false" />
        </div>
        <div class="absolute flex flex-row w-11/12 h-5/6">
            <div v-if="listprojects" class="w-3/12 bg-green-200 space-y-4 overflow-y-auto" :class="{hidden: hideprojects}">
                <p>Projects</p>
                <div class="">
                    <Project v-for="proj in listprojects" v-bind:key="proj"
                             :title="proj"
                             :tasks="listtasksofprojects[proj]" />
                </div>
            </div>
            <div class="w-full bg-blue-200 overflow-y-auto">
                <VueDraggableNext v-model="boardlists" group="listgroup" class="flex flex-row flex-wrap min-h-full">
                    <Tasklist v-for="list in boardlists" v-bind:key="list"
                              :title="list.title"
                              :tasks="list.tasks"
                              :hideme="false"
                              :selector="selectors"
                              @sort="(value) => update_sort(value.sort_value, value.tasks)" />
                </VueDraggableNext>
            </div>
        </div>
    </div>
    <div class="absolute top-5 right-0 flex flex-col w-1/12 h-full z-30 hover:w-2/12">
        <div class="w-full h-full bg-gray-200 overflow-y-auto">
            <VueDraggableNext v-model="sidedlists" group="listgroup" class="flex flex-col flex-wrap min-h-full">
                <Tasklist v-for="list in sidedlists" v-bind:key="list"
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
    import Task from "./Task.vue";
    import Taskmenu from "./Taskmenu.vue";
    import Tasklist from "./Tasklist.vue";
    import Listmenu from "./listmenu.vue";
    import { VueDraggableNext } from 'vue-draggable-next';
    import { getUserTasks, createUserTask } from '../api/users';
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
        projects: []
    }
    var isNewTaskClicked = ref(false);
    var isNewListClicked = ref(false);
    var hideprojects = ref(false)

    //get all tasks from the server for this user
    async function getAllTasks() {
        const data = await getUserTasks({ email: store.getters.email })
        if (data.tasks.length != 0) {
            for (var taski in data.tasks) {
                all_lists.value['Inbox'].push(data.tasks[taski]) //adding task to inbox list

                // filling listcontexts
                for (var context in data.tasks[taski].contexts) {
                    if (!listcontexts.value.includes(data.tasks[taski].contexts[context]) && (data.tasks[taski].contexts[context]!='')) {
                        listcontexts.value.push(data.tasks[taski].contexts[context])
                    }
                }

                // filling listproject
                if (!listprojects.value.includes(data.tasks[taski].project) && (data.tasks[taski].project != '') && (data.tasks[taski].project != null)) {
                    listprojects.value.push(data.tasks[taski].project)
                    listtasksofprojects.value[data.tasks[taski].project] = []
                }
                if ((data.tasks[taski].project != '') && (data.tasks[taski].project != null))
                    listtasksofprojects.value[data.tasks[taski].project].push(data.tasks[taski])
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

            // filling listcontext
            for (var context in data.task.contexts) {
                if (!listcontexts.value.includes(data.task.contexts[context])) {
                    listcontexts.value.push(data.task.contexts[context])
                }
            }

            // filling listprojects
            if (!listprojects.value.includes(data.task.project) && (data.task.project != '') && (data.task.project != null)) {
                listprojects.value.push(data.task.project)
                listtasksofprojects.value[data.task.project] = []
            }
            (data.task.project != '') && (data.task.project != null)
                listtasksofprojects.value[data.task.project].push(data.task)
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
    }

    const openTaskMenu = () => {
        isNewListClicked.value = false;
        isNewTaskClicked.value = !isNewTaskClicked.value;
    }

    const openListMenu = () => {
        isNewTaskClicked.value = false;
        isNewListClicked.value = !isNewListClicked.value;
    }

    const showProject = (event) => {
        if (event.target.checked) {
            hideprojects.value = true
        } else {
            hideprojects.value = false
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

    // change selector value for the date, only works with today atm
    const selectDate = (event) => {
        //only today for now but date should be selected from calendar and be a Date()
        const today = new Date()
        selectors.value.dates = []
        if (event.target.checked) {
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

    // return true if selector empty and all value should be set to true
    const isSelectorEmpty = () => {
        if ((selectors.value.dates.length == 0) && (selectors.value.contexts.length == 0) && (selectors.value.projects.length == 0))
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