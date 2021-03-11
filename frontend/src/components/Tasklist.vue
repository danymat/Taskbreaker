<template>
    <div class="text-center flex flex-col space-y-10 mb-10 mr-10 border-2 border-black">
        <h1>{{ title }}</h1>
        <select name="sort" v-model="sortval" @change="send_sort" :class="{hidden: hideme}">
            <option value="manual">Manual sort</option>
            <option value="priority">Priority sort</option>
            <option value="creation_date">Creation Date sort</option>
            <option value="completion_date">Completion Date sort</option>
        </select>
        <div class="space-y-2" :class="{hidden: hideme}">
            <VueDraggableNext group="taskgroup" :list="tasks" @change="send_sort">
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
    import { ref, defineProps, defineEmit } from "vue";
    import Task from "./Task.vue";
    import { VueDraggableNext } from 'vue-draggable-next';


    var sortval = ref("");
    sortval.value = "manual";

    var props = defineProps({
        title: String,
        tasks: Array,
        hideme: Boolean
    });

    const emit = defineEmit(["sort"]);

    const send_sort = () => {
        emit("sort", { "sort_value": sortval.value, "tasks": props.tasks });
    }
</script>