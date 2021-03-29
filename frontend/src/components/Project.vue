<template>
    <div class="text-center flex flex-col space-y-4 m-4 rounded-md m-4 h-3/6 bg-red-200" v-on:click="handleClick">
        <h1 class="text-base font-serif italic font-bold text-purple-900" :class="{'line-through': isProjectCompleted()}">{{ title }} -- {{ tasks.length }} task{{ isThereOnlyOneTask() }}</h1>
        <div class="flex flex-col" :class="{hidden: hideme}">
            <Task v-for="task in tasks" v-bind:key="task"
                  :priority="task.priority"
                  :createdDate="task.createdDate"
                  :completionDate="task.completionDate"
                  :description="task.description"
                  :contexts="task.contexts"
                  :nobutton="true"
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

    const isProjectCompleted = () => {
        for (var task of props.tasks) {
            if (!task.completionDate)
                return false
        }
        return true
    }
    hideme.value = isProjectCompleted()
</script>