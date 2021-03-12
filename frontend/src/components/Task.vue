<template>
    <div class="flex relative flex-row p-2 gap-4 bg-gradient-to-r items-center justify-evenly content-center from-gray-600 to-gray-700 rounded-2xl text-gray-50 shadow-lg">

        <div v-if="priority">
            <div class="absolute font-extralight text-xs">priority</div>
            <h2 class="text-xl ml-7 mt-4 font-bolds">{{ priority }}</h2>
        </div>
        <div v-if="createdDate">
            <div class="absolute font-extralight text-xs">Creation Date</div>
            <h2 class="ml-12 mt-4">{{ getDateDay() }}/{{ getDateMonth() }}/{{ getDateYear() }}</h2>
        </div>
        <div>
            <h2 class="text-xl ml-7 font-bolds">{{ description }}</h2>
        </div>

        <div v-if="contexts.length != 0">
            <div class="absolute font-extralight text-xs">Context</div>
            <div v-for="context in contexts" v-bind:key="context">
                <h2 class="font-light ml-12">{{ context }}</h2>
            </div>
        </div>

        <div v-if="project">
            <div class="absolute font-extralight text-xs">Project</div>
            <h2 class="ml-12 ">{{ project }}</h2>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

    var props = defineProps({
        priority: "",
        createdDate: Number,
        description: "",
        contexts: Array,
        project: ""
    });

    const getDateDay = () => {
        var date = new Date(props.createdDate)
        return date.getDay()
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