export type Task = {
  id: number
  title: string
  description: string
  createdAtTimestamp: number
  isDone: boolean
}

export type TaskWithoutId = Omit<Task, "id">
