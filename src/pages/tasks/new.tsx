import { Button, Card, Form, Grid, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Task } from "src/interfaces/task";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Layout from "src/components/layaout";
import { log } from "console";

export default function NewPage() {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [openConfirm, setOpenConfirm] = useState(false);
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

  const deleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });

      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = async (task: Task, id: string) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const loadTask = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
    const task = await res.json();

    setTask({ title: task.title, description: task.description });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        await updateTask(task, router.query.id);
      } else {
        await createTask(task);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadTask(router.query.id);
    }
  }, [router.query]);

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign={"middle"}
        style={{ heigth: "70%" }}
      >
        <Grid.Column>
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
                    value={task.title}
                  ></input>
                </Form.Field>
                <Form.Field>
                  <label htmlFor="title"> Description: </label>
                  <textarea
                    name="description"
                    rows={2}
                    placeholder="write a description"
                    onChange={handleChange}
                    value={task.description}
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal">
                    <Icon name="save" />
                    Update
                  </Button>
                ) : (
                  <Button primary>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>
          {router.query.id && (
            <Button color="red" onClick={() => setOpenConfirm(true)}>
              DELETE
            </Button>
          )}
        </Grid.Column>
      </Grid>
      <Confirm
        header="delete a task"
        content="are you sure to delete"
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && deleteTask(router.query.id)
        }
      />
    </Layout>
  );
}
