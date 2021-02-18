<template>
    <div class="border-2" :class="bdcolor">
        <form class="flex flex-row space-y-4" onsubmit="event.preventDefault()">
            <div class="m-0">
                <select name="priority" v-model="task.priority">
                    <option value="">--Priority Optional--</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
                <button @click="changeSelectDate" class="mx-2 font-light text-white py-1 px-2 bg-gray-500 rounded-2xl shadow-sm transition transform duration-500 hover:scale-105">Completion Date</button>
                <div v-if="selectDate">
                    <input type="date" v-model="task.completion_date" />
                    <!-- <input type="date" v-model="task.creation_date" /> -->
                </div>
                <input type="text" placeholder="Taskname *Required*" v-model="task.description" />
                <input type="text" placeholder="Context" v-model="task.context" />
                <input type="text" placeholder="Project" v-model="task.project" />
                <div class="flex flex-row">
                    <NewButton buttonName="Create Task" class="p-2" @click="createTask" />
                    <img :src="'/sprites/wizzard/run_'+img_number+'.png'" width="40" height="37" />
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
    import { ref, defineEmit } from "vue";
    import NewButton from "./NewButton.vue";

    var selectDate = ref(false);

    function changeSelectDate() {
        if (selectDate.value == true) {
            task.value.completion_date = null;
            selectDate.value = false;
        } else {
            task.value.completion_date = new Date().toISOString().slice(0, 10);
            selectDate.value = true;
        }
    }

    const img_number = ref(1);
    setInterval(change_img, 100);
    function change_img() {
        img_number.value = (img_number.value) % 4 + 1
    }

    var bdcolor = ref("")
    var task = ref({
        priority: "",
        completion_date: null,
        creation_date: null,
        description: "",
        context: "",
        project: "",
        special: {}
    });

    const emit = defineEmit(["task"]);

    const createTask = () => {
        if (task.value.description.length != 0) {
            task.value.creation_date = new Date().toISOString().slice(0, 10);
            emit("task", task);
        } else {
            bdcolor.value = "border-red-600";
        }
    }
</script>