import { Container } from "@chakra-ui/react";
import Navbar from "../../components/Navbar/Navbar";
import RightSide from "./RightSide";

const Dashboard = () => {
  return (
    <>
      <Container  display={"flex"}  gap={2} maxWidth={"100vw"} maxHeight={"100vh"} padding={0} backgroundColor={'brand.background'}>
        <Navbar />
        <RightSide/>
        </Container>
    </>
  );
};

export default Dashboard;
