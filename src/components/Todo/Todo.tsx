import { Component } from "react"
import { type Task } from "@/types"
import { cn } from "@/lib/utils"
import { formatTimestamp } from "@/helpers"
import { Button, Checkbox } from "@/components/ui"
import styles from "./Todo.module.css"

type TodoProps = {
  data: Task
  onStatusToggle: (id: Task["id"], isDone: boolean) => void
  onDelete: (id: Task["id"]) => void
}

export class Todo extends Component<TodoProps> {
  constructor(props: TodoProps) {
    super(props)
  }

  handleToggleStatus = (isDone: boolean) => {
    const { onStatusToggle, data } = this.props

    onStatusToggle(data.id, isDone)
  }

  handleDelete = () => {
    const { onDelete, data } = this.props

    onDelete(data.id)
  }

  render() {
    const { handleToggleStatus, handleDelete } = this
    const { title, description, createdAtTimestamp, isDone } = this.props.data

    return (
      <div
        className={cn(
          styles.container,
          "px-4 py-3 rounded-md border",
          isDone && "opacity-50"
        )}
      >
        <div className={cn(styles.info, "relative overflow-hidden")}>
          <div className="flex items-center gap-3">
            <Checkbox checked={isDone} onCheckedChange={handleToggleStatus} />
            <div className="flex flex-col gap-1">
              <p className="font-medium text-xl leading-none">{title}</p>
              {description && <p>{description}</p>}
            </div>
            <div className={cn(styles.deleteButton, "ml-auto self-center")}>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
          <div className={cn(styles.date, "text-secondary text-right")}>
            {formatTimestamp(createdAtTimestamp)}
          </div>
        </div>
      </div>
    )
  }
}
