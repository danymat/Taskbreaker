<template>
    <button 
            class="items-center pr-2 rounded-md transition duration-300 transform hover:scale-110 hover:text-gray-900" 
            :class="{'bg-gradient-to-r from-green-500 to-green-200': isClicked, 'bg-gradient-to-r from-red-200 to-red-500': !isClicked}" 
            v-on:click="clickme"
            >
        <span class="ml-2 text-black-600 font-bold text-xs">{{ buttonName }}</span>
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