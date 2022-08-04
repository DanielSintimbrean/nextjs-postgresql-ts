import { Button, Container, Menu } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <Menu inverted attached style={{ padding: "1.5rem" }}>
      <Container>
        <Menu.Item onClick={() => router.push("/")}>
          <Image src="/../public/mrc.png" alt="MRC" width={50} height={50} />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={() => router.push("/tasks/new")}>New Task</Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
