import { Component, RefObject } from "react"
import { Textarea, Button, Input, Label } from "@/components/ui"
import { type TaskWithoutId, type Task } from "@/types"
import { PlusCircledIcon } from "@radix-ui/react-icons"

type CreateTodoFormProps = {
  inputRef: RefObject<HTMLInputElement>
  onSubmit: (task: TaskWithoutId) => void
}

type CreateTodoFormState = {
  title: Task["title"]
  description: Task["description"]
  error: string
}

export class CreateTodoForm extends Component<
  CreateTodoFormProps,
  CreateTodoFormState
> {
  constructor(props: CreateTodoFormProps) {
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
      <form className="flex flex-col gap-3" onSubmit={this.handleFormSubmit}>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter the title of a task"
            value={title}
            onChange={handleTitleChange}
            ref={inputRef}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter the description of a task"
            value={description}
            onChange={handleDescriptionChange}
            rows={6}
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
        <Button type="submit">
          <PlusCircledIcon className="mr-1.5 h-4 w-4" /> Add
        </Button>
      </form>
    )
  }
}
