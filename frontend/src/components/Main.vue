<template>
    <div class="text-center flex flex-col space-y-10">
        <div class="text-center flex flex-col space-y-10 border-2 border-black">
            <Tasklist :title="nextlist.title"
                      :tasks="nextlist.tasks"
                      @sort="(value) => update_sort(value.sort_value, value.tasks)" />
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import Task from "./Task.vue";
    import Tasklist from "./Tasklist.vue";

    var nextlist = ref({});
    nextlist.value = {
        "title": "Next Actions",
        "tasks": {}
    };

    var sort_value = ref("");
    sort_value.value = "manual";

    // sorting
    const update_sort = (sorter, tasks) => {
        sort_value.value = sorter;
        if (sorter != "manual") {
            if (sorter == "priority")
                tasks.sort(task_sorter_priority);
            else
                if (sorter == "completion_date")
                    tasks.sort(task_sorter_completion);
                else
                    if (sorter == "creation_date")
                        tasks.sort(task_sorter_creation);
        }

    };

    const task_sorter_priority = (a, b) => {
        console.log(a, b)
        if (a.priority != "" && b.priority != "") {
            if (a.priority < b.priority)
                return -1;
            if (a.priority > b.priority)
                return 1;
        }
        if (a.priority != "" && b.priority == "") return -1
        if (b.priority != "" && a.priority == "") return 1
        if (b.priority == "" && a.priority == "") return 1
        return 0;
    };

    const task_sorter_completion = (a, b) => {
        if (a.completion_date < b.completion_date)
            return -1;
        if (a.completion_date > b.completion_date)
            return 1;

        return 0;
    };

    const task_sorter_creation = (a, b) => {
        if (a.creation_date < b.creation_date)
            return -1;
        if (a.creation_date > b.creation_date)
            return 1;

        return 0;
    };
</script>