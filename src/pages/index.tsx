import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Task } from "src/interfaces/task";
import { Grid, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import TaskList from "src/components/tasksList";
import Layout from "src/components/layaout";

interface Props {
  tasks: Task[];
}

const Home: NextPage<Props> = ({ tasks }: Props) => {
  const router = useRouter();

  return (
    <Layout>
      {tasks.length === 0 ? (
        <Grid
          columns={3}
          centered
          verticalAlign="middle"
          style={{ height: "70%" }}
        >
          <Grid.Row>
            <Grid.Column>
              <h1>No tasks yey</h1>
              <Button onClick={() => router.push("/tasks/new")}>
                Create one
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <TaskList tasks={tasks}></TaskList>
      )}
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  console.log(tasks);

  return {
    props: {
      tasks: tasks,
    },
  };
};

export default Home;
