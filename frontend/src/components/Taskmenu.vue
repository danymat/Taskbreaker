<template>
    <div class="bg-gray-100 border shadow-sm rounded text-gray-900" :class="bdcolor">
        <form class="flex flex-row space-x-2" onsubmit="event.preventDefault()">

            <NewButton buttonName="Create Task" class="flex flex-row space-x-2 w-1/4" @click="createTask" />

            <input type="text" placeholder="New task..." v-model="task.description" class="border-transparent w-full bg-gray-100 focus:ring-1 focus:ring-gray-400 focus:border-transparent" />

            <select name="priorityList" class="border-transparent w-25 bg-gray-100 focus:ring-1 focus:ring-gray-400 focus:border-transparent">
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
                <option value="None" selected="selected">No priority</option>
            </select>
            <input type="text" placeholder="Context" v-model="context" list="contextslist" class="border-transparent w-25 bg-gray-100 focus:ring-1 focus:ring-gray-400 focus:border-transparent" />
            <datalist id="contextslist">
                <option v-for="cont in contexts">{{cont}}</option>
            </datalist>
            <input type="text" placeholder="Project" v-model="task.project" list="projectslist" class="border-transparent w-25 bg-gray-100 focus:ring-1 focus:ring-gray-400 focus:border-transparent" />
            <datalist id="projectslist">
                <option v-for="proj in projects">{{proj}}</option>
            </datalist>
        </form>
    </div>
</template>
<script setup>
    import { ref, defineEmit, defineProps } from "vue";
    import NewButton from "./NewButton.vue";

    const context = ref("")
    const priori = ref(null)

    defineProps({
        listsnames: Array,
        contexts: Array,
        projects: Array
    });

    var bdcolor = ref("")
    var task = ref({
        priority: null,
        description: "",
        contexts: [],
        project: ""
    });

    const emit = defineEmit(["task"]);

    const createTask = () => {
        if (task.value.description.length != 0) {
            task.value.priority = parseInt(priori.value, 10)
            if (context.value != "")
                task.value.contexts.push(context.value)
            emit("task", task);
            task.value.contexts = [];
        } else {
            bdcolor.value = "border-red-600";
        }
    }
</script>