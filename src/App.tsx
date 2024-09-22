import { Component, createRef, RefObject } from "react"
import { Checkbox, Separator } from "@/components/ui"
import { CreateTaskForm, Todo } from "@/components"
import type { TaskWithoutId, Task } from "@/types"
import { getNewTaskId, storage } from "@/helpers"

type TodoListState = {
  tasks: Task[]
  showOnlyUncompletedTasks: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class App extends Component<{}, TodoListState> {
  private titleInput: RefObject<HTMLInputElement>
  // @ts-expect-error props is always {}
  constructor(props) {
    super(props)
    this.titleInput = createRef()
    this.state = {
      tasks: [],
      showOnlyUncompletedTasks: false,
    }
  }

  handleCreateTaskSubmit = (task: TaskWithoutId) => {
    const newTask = {
      id: getNewTaskId(this.state.tasks),
      ...task,
    }

    this.setState((state) => ({
      tasks: [...state.tasks, newTask],
    }))

    this.titleInput.current?.focus()
  }

  handleToggleStatus = (id: Task["id"], isDone: boolean) => {
    this.setState((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isDone } : task
      ),
    }))
  }

  handleDelete = (id: Task["id"]) => {
    this.setState((state) => ({
      ...state,
      tasks: state.tasks.filter((task) => task.id !== id),
    }))
  }

  handleToggleFilter = (isChecked: boolean) => {
    this.setState({
      showOnlyUncompletedTasks: isChecked,
    })
  }

  getFilteredTasks = () => {
    const { tasks, showOnlyUncompletedTasks } = this.state

    return showOnlyUncompletedTasks
      ? tasks
          .sort((t1, t2) => t2.createdAtTimestamp - t1.createdAtTimestamp)
          .filter((task) => task.isDone === false)
      : tasks
          .sort((t1, t2) => t2.createdAtTimestamp - t1.createdAtTimestamp)
          .sort((t1, t2) => Number(t1.isDone) - Number(t2.isDone))
  }

  componentDidUpdate() {
    storage.syncTasks(this.state.tasks)
  }

  componentDidMount() {
    // Setting shadcn/ui theme:
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add("dark")

    const savedTasks = storage.getTasks()

    if (!savedTasks.length) {
      return
    }

    this.setState({
      tasks: savedTasks,
    })
  }

  render() {
    const {
      titleInput,
      handleCreateTaskSubmit,
      handleToggleStatus,
      handleDelete,
      handleToggleFilter,
      getFilteredTasks,
    } = this
    const { tasks, showOnlyUncompletedTasks } = this.state

    const filteredTasks = getFilteredTasks()

    return (
      <div className="flex flex-col p-6 gap-6 w-container max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-center">Todo List</h1>
        <Separator />

        <CreateTaskForm
          onSubmit={handleCreateTaskSubmit}
          inputRef={titleInput}
        />
        <Separator />

        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="only-uncompleted-tasks"
              checked={showOnlyUncompletedTasks}
              onCheckedChange={handleToggleFilter}
            />
            <label
              htmlFor="only-uncompleted-tasks"
              className="text-sm font-medium leading-none"
            >
              Only uncompleted tasks
            </label>
          </div>
          <div className="flex flex-col gap-2">
            {!filteredTasks.length ? (
              <p className="text-center">
                {!tasks.length
                  ? "You have no tasks"
                  : "You have no tasks with this filter"}
              </p>
            ) : (
              filteredTasks.map((task) => (
                <Todo
                  key={task.id}
                  data={task}
                  onStatusToggle={handleToggleStatus}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
}
