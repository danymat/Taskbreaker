<template>
    <div class="flex flex-col space-y-5 rounded-md m-4 h-3/6 bg-gray-400">
        <h1 class="text-lg font-bold pt-2">{{ title }}</h1>
        <select name="sort" v-model="sortval" @change="send_sort" :class="{hidden: hideme}"
        class="border shadow-sm rounded-md w-25 bg-gray-100 focus:ring-1 focus:ring-gray-400 focus:border-transparent">
            <option value="manual">Manual sort</option>
            <option value="priority">Priority sort</option>
            <option value="creation_date">Creation Date sort</option>
        </select>
        <div class="space-y-2 p-1" :class="{hidden: hideme}">
            <VueDraggableNext group="taskgroup" :list="tasks" @change="send_sort">
                <Task v-for="task in tasks" v-bind:key="task"
                      :uuid="task.uuid"
                      :priority="task.priority"
                      :createdDate="task.createdDate"
                      :description="task.description"
                      :contexts="task.contexts"
                      :project="task.project"
                      :completionDate="task.completionDate"
                      :show="showme(task)"
                      :nobutton="false"
                      @complete="(value) => completeTask(value)"
                      />
            </VueDraggableNext>
        </div>
    </div>
</template>
<script setup>
    import { ref, defineProps, defineEmit } from "vue";
    import Task from "./Task.vue";
    import { VueDraggableNext } from 'vue-draggable-next';


    var sortval = ref("");
    sortval.value = "manual";

    var props = defineProps({
        title: String,
        tasks: Array,
        hideme: Boolean,
        selector: {}
    });

    const showme = (task) => {
        return (passContextSelect(task) && passDateSelect(task) && passProjectSelect(task) && passCompleted(task))
    }

    // return true if the task is in the context selected or any
    function passContextSelect(task) {
        if (props.selector.contexts.length != 0) {
            for (var cont of props.selector.contexts) {
                if (task.contexts.includes(cont))
                    return true
            }
        } else {
            return true
        }
        return false
    }

    // return true if the task is at the date selected or any
    function passDateSelect(task) {
        if (props.selector.dates.length != 0) {
            for (var date of props.selector.dates) {
                const taskdate = new Date(task.createdDate)
                const selectdate = new Date(date)
                if ((taskdate.getMonth() == selectdate.getMonth()) && (taskdate.getDate() == selectdate.getDate()) && (taskdate.getFullYear() == selectdate.getFullYear()))
                    return true
            }
        } else {
            return true
        }
        return false
    }

    // return true if the task is in the project selected or any
    function passProjectSelect(task) {
        if (props.selector.projects.length != 0) {
            if (props.selector.projects.includes(task.project))
                return true
        } else {
            return true
        }
        return false
    }

    // return true if the task is not completed or the selectors does not include not completed only
    function passCompleted(task) {
        if (props.selector.completedonly == true) {
            if(task.completionDate)
                return false
        } else {
            return true
        }
        return true
    }

    const emit = defineEmit(["sort", "complete"]);

    const completeTask = (uuid) => {
        emit("complete", uuid)
    }

    const send_sort = () => {
        emit("sort", { "sort_value": sortval.value, "tasks": props.tasks });
    }
</script>