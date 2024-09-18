import { Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
const Profile = () => {
  return (
    <>
      <Container maxWidth={"100vw"} maxHeight={"100vh"} padding={0} backgroundColor={'brand.background'}>
        <Navbar />
      </Container>
    </>
  );
};

export default Profile;
