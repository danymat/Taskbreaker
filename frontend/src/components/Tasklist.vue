<template>
    <div class="text-center flex flex-col space-y-10 border-2 border-black">
        <h1>{{ title }}</h1>
        <select name="sort" v-model="sortval" @change="update_sort">
            <option value="">Sort By</option>
            <option value="priority">Priority</option>
            <option value="creation_date">Creation Date</option>
            <option value="completion_date">Completion Date</option>
            <option value="manual">Manual</option>
        </select>
        <div class="space-y-2">
            <VueDraggableNext group="taskgroup" :list="tasks" @change="handle_sort">
                <div v-for="task in tasks" v-bind:key="task">
                    <Task :priority="task.priority"
                          :completion_date="task.completion_date"
                          :creation_date="task.creation_date"
                          :description="task.description"
                          :context="task.context"
                          :project="task.project"
                          :special="task.special" />
                </div>
            </VueDraggableNext>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineProps } from "vue";
    import Task from "./Task.vue";
    import { VueDraggableNext } from 'vue-draggable-next';

    var sortval = ref("");

    var props = defineProps({
        title: String,
        tasks: Array
    });

    const handle_sort = () => {
        if (sortval.value != "manual") {
            update_sort();
        }
    }

    const update_sort = () => {
        if (sortval.value == "priority")
            props.tasks.sort(task_sorter_priority);
        else
            if (sortval.value == "completion_date")
                props.tasks.sort(task_sorter_completion);
            else
                if (sortval.value == "creation_date")
                    props.tasks.sort(task_sorter_creation);

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