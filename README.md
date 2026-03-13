# Task Queue Manager (JavaScript)

## Overview
This project is a simple Task Queue Manager built using JavaScript. It simulates how a backend system manages and executes tasks asynchronously. Tasks can be added to a queue with different priority levels, and the system processes them automatically.

## How the System Works
The system maintains a queue of tasks. Each task contains a function that performs some work. When tasks are added, they are stored in the queue with a priority level.
The queue processes tasks in batches. At most three tasks are executed at the same time. Tasks with higher priority are executed before tasks with lower priority.
The system also tracks the status of each task and stores completed tasks in a history list.

## Features
- Add tasks to the queue
- Assign priority to tasks (high, medium, low)
- Execute tasks asynchronously
- Run up to three tasks at the same time
- Track task status (pending, running, completed, failed)
- Store execution history of tasks
- Pause and resume the queue
- Execute callback functions after task completion

## Task Structure
Each task added to the queue contains the following information:

- **id** – unique identifier for the task  
- **priority** – priority level (high, medium, low)  
- **status** – current state of the task  
- **taskfn** – the function that performs the task  
- **callback** – optional function that runs after task completion  
- **createdAt** – time when the task was added  
- **startedAt** – time when the task started execution  
- **completedAt** – time when the task finished  

## Priority Handling
Tasks are sorted based on priority before execution.

- High priority tasks run first
- Medium priority tasks run next
- Low priority tasks run last
This ensures that more important tasks are executed earlier.

## Execution Flow
1. A task is added to the queue using the `addTask()` function.  
2. The task is stored with status pending.  
3. The queue sorts tasks based on priority.  
4. Up to three pending tasks are selected for execution.  
5. Each task runs asynchronously.  
6. After completion, the status changes to either completed or failed.  
7. The task is stored in the history list.  
8. If a callback function is provided, it is executed after the task finishes.  

## Queue Controls

### pauseQueue()
Stops the queue from processing new tasks.

### resumeQueue()
Resumes the queue and continues processing pending tasks.

### getTasks()
Returns all tasks currently in the queue.

### getHistory()
Returns all completed or failed tasks.
