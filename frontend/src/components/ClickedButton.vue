<template>
    <button
            class="px-2 border shadow-sm rounded-md transition duration-300 transform hover:scale-105 "
            :class="{'bg-gray-100 ': isClicked, 'bg-gray-400': !isClicked}"
            v-on:click="clickme"
            >
        <span class="">{{ buttonName }}</span>
    </button>
</template>
<script setup>
    import { defineProps, ref, defineEmit } from "vue"

    const props = defineProps({
        buttonName: String,
        defaultClicked: Boolean
    })
    const isClicked = ref(props.defaultClicked)

    const emit = defineEmit(["isclicked"])

    const clickme = () => {
        isClicked.value = !isClicked.value
        emit('isclicked', isClicked.value)
    }
</script>