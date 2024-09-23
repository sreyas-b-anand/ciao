import {  createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Container,
  Button,
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { auth } from "../../firebase"; 
import { useNavigate } from "react-router-dom";
export const UserContext = createContext(null)
const Register = () => {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const handleAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        // Registration successful
        setError(null);
        
        
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        // Login successful
        setError(null);
      }
      navigate('/dashboard')
    } catch (err) {
      const error = err as Error
      setError(error.message)
      setTimeout(()=>{
        setError(null)
      } , 3000)

      clearTimeout(11)
    }
  };

  return (
    <Container
      minH="100vh"
      minW="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="brand.background"
    >
      <Box
        color={"brand.textPrimary"}
        p={8}
        px={10}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
        backgroundColor="transparent"
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={4}
        backdropFilter="blur(10px)"
      >
        <Heading
          mb={4}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
        >
          {isRegister ? "Register" : " Login "}
        </Heading>
       
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button backgroundColor="brand.primary" onClick={handleAuth}>
            {isRegister ? "Register" : " Login " }
            
          </Button>
          
          <Button
            variant="link"
            color="brand.textSecondary"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Create an account"}
          </Button>
          {error && <Box color="brand.error">{error}</Box>}
        </Stack>
      </Box>
    </Container>
  );
};

export default Register;
