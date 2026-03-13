function createTaskQueue() {

    let tasks = [];
    let history = [];
    let paused = false;
    let processing = false;
    let taskCounter = 0;

    const priorityMap = {
        high: 1,
        medium: 2,
        low: 3
    }

    function addTask(taskfn, priority, callback) {

        if (typeof taskfn !== "function") {
            console.log("Task must have a function!");
            return;
        }

        if (!priorityMap[priority]) {
            console.log("Invalid priority!");
            return;
        }

        taskCounter++;

        const taskObject = {
            id: taskCounter,
            priority,
            status: "pending",
            taskfn,
            callback,
            createdAt: Date.now()
        }

        tasks.push(taskObject)

        processQueue()
    }


    function processQueue() {

        if (paused || processing) return
        if (tasks.length === 0) return

        processing = true

        tasks.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority])

        const pendingTasks = tasks.filter(task => task.status === "pending")

        if (pendingTasks.length === 0) {
            processing = false
            return
        }

        const batch = pendingTasks.slice(0, 3)

        for (let task of batch) {
            executeTask(task)
        }

        processing = false
    }


    async function executeTask(task) {

        task.status = "running"
        task.startedAt = Date.now()

        let result

        try {

            result = await task.taskfn()

            task.status = "completed"

        } catch (error) {

            task.status = "failed"
            task.error = error.message
        }

        task.completedAt = Date.now()

        history.push(task)

        if (typeof task.callback === "function") {
            task.callback(result, task.status)
        }

        processQueue()
    }


    function pauseQueue() {
        paused = true
    }


    function resumeQueue() {
        paused = false
        processQueue()
    }


    function getTasks() {
        return tasks
    }


    function getHistory() {
        return history
    }


    return {
        addTask,
        pauseQueue,
        resumeQueue,
        getTasks,
        getHistory
    }
}

// exaample usage:
const queue = createTaskQueue()

function delayTask(time) {
    return () => new Promise(resolve => {
        setTimeout(() => {
            console.log("Task finished after", time)
            resolve(time)
        }, time)
    })
}

queue.addTask(delayTask(2000), "high", (res, status) => {
    console.log("Callback:", res, status)
})

queue.addTask(delayTask(1000), "medium", (res, status) => {
    console.log("Callback:", res, status)
})

queue.addTask(delayTask(3000), "low", (res, status) => {
    console.log("Callback:", res, status)
})