<template>
  <button class="group flex items-center transition duration-500 transform hover:scale-110 hover:text-gray-900">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="fill-current text-white-600 h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    <span class="ml-2 text-white-600 text-base">{{ buttonName }}</span>
  </button>
</template>
<script setup>
    import { defineProps } from "vue";

    defineProps({
        buttonName: String
    });
</script>