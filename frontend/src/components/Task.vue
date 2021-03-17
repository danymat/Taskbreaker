<template>
    <div v-if="show" class="flex relative flex-row p-2 gap-2 bg-gradient-to-r items-center justify-evenly content-center from-gray-600 to-gray-700 rounded-2xl text-gray-50 shadow-lg">
        <div v-if="priority">
            <div class="absolute font-extralight text-tiny">priority</div>
            <h2 class="ml-2 mt-2 font-bolds text-xs">{{ priority.toString() }}</h2>
        </div>
        <div v-if="createdDate">
            <h2 class="ml-2 mt-2 text-xs">{{ getDateDay() }}/{{ getDateMonth() }}/{{ getDateYear() }}</h2>
        </div>
        <div>
            <h2 class="text-l ml-2 font-bolds text-sm">{{ description }}</h2>
        </div>
        <div v-if="contexts" class="flex flex-col">
            <div v-for="context in contexts" v-bind:key="context">
                <h2 class="font-light ml-1 text-xs">@{{ context }}</h2>
            </div>
        </div>
        <div v-if="project">
            <div class="absolute font-extralight text-tiny">Project</div>
            <h2 class="ml-2 mt-2 text-xs">{{ project }}</h2>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

    var props = defineProps({
        priority: Number,
        createdDate: String,
        description: "",
        contexts: Array,
        project: "",
        show: Boolean
    });

    const getDateDay = () => {
        var date = new Date(props.createdDate)
        return date.getDate()
    }

    const getDateMonth = () => {
        var date = new Date(props.createdDate)
        return date.getMonth()+1
    }

    const getDateYear = () => {
        var date = new Date(props.createdDate)
        return date.getFullYear()
    }
</script>