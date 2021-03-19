<template>
    <div class="bg-green-200 border-2" :class="bdcolor">
        <form class="flex flex-row" onsubmit="event.preventDefault()">
            <div class="flex flex-row space-x-2">
                <NewButton buttonName="Create Task" class="" @click="createTask" />
                <img :src="'/sprites/wizzard/run_'+img_number+'.png'" width="40" height="37" />
            </div>
                <input type="number" placeholder="priority" v-model="priori" min="0" max="2" />
                <select name="listname" v-model="listname">
                    <option value="">--List Name--</option>
                    <option :value="name" v-for="name in listsnames" v-bind:key="name">{{ name }}</option>
                </select>
                <input type="text" placeholder="Taskname *Required*" v-model="task.description" />
                <input type="text" placeholder="Context" v-model="context" />
                <input type="text" placeholder="Project" v-model="task.project" />

        </form>
    </div>
</template>
<script setup>
    import { ref, defineEmit, defineProps } from "vue";
    import NewButton from "./NewButton.vue";

    const context = ref("")
    const priori = ref(null)

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
        priority: null,
        description: "",
        contexts: [],
        project: ""
    });

    const emit = defineEmit(["task"]);

    const createTask = () => {
        if (task.value.description.length != 0) {
            task.value.priority = parseInt(priori.value, 10)
            task.value.contexts.push(context.value)
            emit("task", [task,listname]);
        } else {
            bdcolor.value = "border-red-600";
        }
    }
</script>