import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Container maxWidth={"100vw"} maxHeight={"100vh"} padding={0}>
        <Navbar />
      </Container>
    </>
  );
};

export default Dashboard;
