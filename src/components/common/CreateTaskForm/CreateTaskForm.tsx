import { Component, RefObject } from "react"
import { Textarea, Button, Input } from "@/components/ui"
import { type TaskWithoutId, type Task } from "@/types"

type CreateTaskFormProps = {
  inputRef: RefObject<HTMLInputElement>
  onSubmit: (task: TaskWithoutId) => void
}

type CreateTaskFormState = {
  title: Task["title"]
  description: Task["description"]
  error: string
}

export class CreateTaskForm extends Component<
  CreateTaskFormProps,
  CreateTaskFormState
> {
  constructor(props: CreateTaskFormProps) {
    super(props)
    this.state = {
      title: "",
      description: "",
      error: "",
    }
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { title, description } = this.state

    if (!title.length) {
      return this.setState({
        error: "Title must not be empty string",
      })
    }

    if (title.trim() !== title) {
      return this.setState({
        error: "Title must not begin or end with a space",
      })
    }

    const createdAtTimestamp = Math.floor(Date.now() / 1000)

    this.props.onSubmit({
      title,
      description,
      createdAtTimestamp,
      isDone: false,
    })

    this.setState({
      title: "",
      description: "",
      error: "",
    })
  }

  handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value })
  }

  handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value })
  }

  render() {
    const { handleTitleChange, handleDescriptionChange } = this
    const { title, description, error } = this.state
    const { inputRef } = this.props

    return (
      <form className="flex flex-col gap-2" onSubmit={this.handleFormSubmit}>
        <Input
          type="text"
          placeholder="Enter the title of a task"
          value={title}
          onChange={handleTitleChange}
          ref={inputRef}
        />
        <Textarea
          placeholder="Enter the description of a task"
          value={description}
          onChange={handleDescriptionChange}
          rows={6}
        />
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
        <Button type="submit">Add</Button>
      </form>
    )
  }
}
