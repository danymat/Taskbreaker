<template>
    <div class="items-center flex flex-col space-y-4 rounded-md mx-3 my-2 h-3/6 bg-gray-300 border shadow-md " v-on:click="handleClick">
        <h1 class="font-serif font-bold text-gray-900">{{ title }} ({{ tasks.length }} task{{ isThereOnlyOneTask() }})</h1>
        <div class="flex flex-col" :class="{hidden: hideme}">
            <Task v-for="task in tasks" v-bind:key="task"
                  :priority="task.priority"
                  :createdDate="task.createdDate"
                  :description="task.description"
                  :contexts="task.contexts"
                  :project="null"
                  :show="true" />
        </div>
    </div>
</template>
<script setup>
    import { ref, defineProps } from "vue";
    import Task from "./Task.vue";

    var hideme= ref(false)
    var props = defineProps({
        title: String,
        tasks: Array
    });

    const isThereOnlyOneTask = () => {
        if (props.tasks.length != 1) return 's'
    }

    const handleClick = () => {
        hideme.value = !hideme.value
    }
</script>