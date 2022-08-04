import { Button, Card, Form, Icon } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "src/interfaces/task";
import { useRouter } from "next/router";
import { NextPage } from "next";

export default function NewPage() {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [name]: value });
  };

  const createTask = async (task: Task) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createTask(task);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Card>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor="title"> Title: </label>
              <input
                type="text"
                placeholder="write your title"
                name="title"
                onChange={handleChange}
              ></input>
            </Form.Field>
            <Form.Field>
              <label htmlFor="title"> Description: </label>
              <textarea
                name="description"
                rows={2}
                placeholder="write a description"
                onChange={handleChange}
              ></textarea>
            </Form.Field>
            <Button>
              <Icon name="save" />
              Save
            </Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
