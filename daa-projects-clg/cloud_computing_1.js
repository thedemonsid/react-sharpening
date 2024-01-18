/*
Cloud computing often involves scheduling tasks on a variety of different machines.
 There are several algorithms that can be used for this purpose, including:

1)First Come First Serve (FCFS): This is the simplest type of scheduling algorithm. 
Tasks are executed in the order they arrive.

2)Shortest Job Next (SJN): This algorithm selects the task with the shortest expected processing time next. 
This can minimize the average waiting time for tasks.

3)Round Robin (RR): This algorithm assigns a fixed time slot for each task and cycles through them. 
This ensures that all tasks get a fair share of the CPU time.

4)Priority Scheduling: This algorithm assigns a priority to each task, and the task with the highest priority is executed next.
 If two tasks have the same priority, it falls back to another algorithm like FCFS.

5)Min-Min: In this algorithm, the scheduler selects the task with the smallest
 execution time and assigns it to the resource that can complete it the soonest.

6)Max-Min: This is similar to Min-Min, but the scheduler selects the task with the 
longest execution time and assigns it to the resource that can complete it the soonest.

7)Genetic Algorithm: This is a search heuristic that is inspired by the process of natural selection. 
Genetic algorithms are used to find optimal or near-optimal solutions to difficult problems which would otherwise take a lifetime to solve.

8)Ant Colony Optimization (ACO): This is a probabilistic technique for solving 
computational problems which can be reduced to finding good paths through graphs.
*/
class Task {
  constructor(id, arrivalTime, processingTime) {
    this.id = id;
    this.arrivalTime = arrivalTime;
    this.processingTime = processingTime;
  }
}
function taskProcessing(tasks) {
  
  let currentTime = 0;
  for (let i = 0; i < tasks.length; i++) {
    // If the task has arrived, process it
    if (tasks[i].arrivalTime <= currentTime) {
      currentTime += tasks[i].processingTime;
    } else {
      // If the task hasn't arrived yet, wait for it
      currentTime = tasks[i].arrivalTime + tasks[i].processingTime;
    }

    // Print task processing order and time
    console.log(`Task ${tasks[i].id} processed at time ${currentTime}`);
  }
}
function fcfsScheduling(tasks) {
  // Sort tasks by arrival time
  tasks.sort((a, b) => a.arrivalTime - b.arrivalTime);
  // Process tasks
  taskProcessing(tasks);
}
function sjnScheduling(tasks) {
  // Sort Tasks by processing time
  tasks.sort((a, b) => a.processingTime - b.processingTime);
  // Process tasks
  taskProcessing(tasks);
}
function rrScheduling(tasks, timeSlot) {
    // No need for sorting

    // Process Tasks
    let currentTime = 0;
    let remainingTime = tasks.map(task => task.processingTime); // Initialize remaining time for each task

    while (true) {
        let allTasksCompleted = true;

        for (let i = 0; i < tasks.length; i++) {
            if (remainingTime[i] > 0) {
                allTasksCompleted = false;

                // Process the task for the given time slot
                if (remainingTime[i] <= timeSlot) {
                    currentTime += remainingTime[i];
                    remainingTime[i] = 0;
                } else {
                    currentTime += timeSlot;
                    remainingTime[i] -= timeSlot;
                }

                // Print task processing order and time
                console.log(`Task ${tasks[i].id} processed at time ${currentTime}`);
            }
        }

        if (allTasksCompleted) {
            break;
        }
    }
}
//Example tasks
let tasks = [
  new Task(1, 0, 5),
  new Task(2, 2, 2),
  new Task(3, 1, 1),
  new Task(4, 3, 3),
];

rrScheduling(tasks,3);
