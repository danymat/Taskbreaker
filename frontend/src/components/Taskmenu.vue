<template>
    <div class="absolute bg-green-200 border-2 w-full z-10" :class="bdcolor">
        <form class="flex flex-row space-y-4" onsubmit="event.preventDefault()">
            <div class="m-0">
                <input type="number" placeholder="priority" v-model="task.priority" />
                <select name="listname" v-model="listname">
                    <option value="">--List Name--</option>
                    <option :value="name" v-for="name in listsnames" v-bind:key="name">{{ name }}</option>
                </select>
                <input type="text" placeholder="Taskname *Required*" v-model="task.description" />
                <input type="text" placeholder="Context" v-model="context" />
                <input type="text" placeholder="Project" v-model="task.project" />
                <div class="flex flex-row">
                    <NewButton buttonName="Create Task" class="p-2" @click="createTask" />
                    <img :src="'/sprites/wizzard/run_'+img_number+'.png'" width="40" height="37" />
                </div>
            </div>
        </form>
        <button class="absolute right-3 top-3 bg-red-600 w-5 h-5" v-on:click="emit('close', true)" />
    </div>
</template>
<script setup>
    import { ref, defineEmit, defineProps } from "vue";
    import NewButton from "./NewButton.vue";

    const context = ref("")

    defineProps({
        listsnames: Array,
    });

    const img_number = ref(1);
    setInterval(change_img, 100);
    function change_img() {
        img_number.value = (img_number.value) % 4 + 1
    }

    var bdcolor = ref("")
    var listname = ref("")
    var task = ref({
        priority: "",
        description: "",
        contexts: [],
        project: ""
    });

    const emit = defineEmit(["task", "close"]);

    const createTask = () => {
        if (task.value.description.length != 0) {
            task.value.contexts.push(context.value)
            emit("task", [task,listname]);
        } else {
            bdcolor.value = "border-red-600";
        }
    }
</script>