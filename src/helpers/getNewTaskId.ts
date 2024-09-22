import { Task } from "@/types"

export const getNewTaskId = (tasks: Task[]) => {
  return tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1
}
