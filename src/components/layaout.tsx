interface Props {
  children: JSX.Element | JSX.Element[];
}
import { Container } from "semantic-ui-react";
import Navbar from "./navbar";
export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar></Navbar>
      <main>
        <Container style={{ paddingTop: "2rem", heigth: "90vp" }}>
          {children}
        </Container>
      </main>
    </div>
  );
}
