import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import useAuthContext from "../hooks/useAuthContext";
import Tabbar from "../components/Navbar/Tabbar";
import TaskCard from "../components/TaskerCard/TaskCard";
import { useEffect, useState } from "react";
import { collection, addDoc, query, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../firebase/firebase";
const Tasker = () => {
  const { user } = useAuthContext();
  console.log("in tasker", user?.email);////////////////////////////////////////////////
  const [ tasks , setTasks] = useState<DocumentData[]>([])
  useEffect(() => {
    const q = query(collection(db, "tasks"));//get tasks
    const tasksData: DocumentData[] = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tasksData.push(doc.data());
      });
      setTasks(tasksData)
      console.log( tasks);///////////////////////////////////////////////
    });
    return () => unsubscribe();
  }, []);

  //tasks
  const hello: boolean = true; //////////////////////////////////////////////////
  const [input, setInput] = useState<string>("");
  const isError = input === "";
  const handleClick = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        user: user?.email,
        timestamp: new Date(),
        status: "pending",
      })
    } catch (error : unknown) {
      console.log(error)
    }
  };
  return (
    <>
      <Flex
        fontFamily={"Montserrat"}
        minWidth={"100vw"}
        minHeight={"100vh"}
        padding={0}
        backgroundColor={"brand.background"}
        direction={"row"}
        zIndex={-2}
      >
        <Navbar />

        <Flex flex={1} direction={"column"} p={3}>
          <Tabbar flexProp={1} />
          <Heading
            py={5}
            textAlign={"center"}
            fontSize={"23px"}
            color={"brand.textPrimary"}
          >
            Add Your To-Do's Here
          </Heading>
          {user || hello ? (
            <>
              <Flex fontFamily={"Montserrat"} color={"white"}>
                <Flex
                  className="flexx"
                  flex={1}
                  alignItems={"center"}
                  gap={3}
                  justifyContent={"center"}
                >
                  <form onSubmit={handleClick}>
                    <FormControl
                      isInvalid={isError}
                      display={"flex"}
                      gap={3}
                      p={3}
                      py={5}
                    >
                      <Input
                        zIndex={4}
                        isRequired={true}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />

                      {isError ? (
                        <FormHelperText color={"brand.textSecondary"}>
                          Enter your task
                        </FormHelperText>
                      ) : (
                        <FormErrorMessage color={"brand.error"}>
                          Required Field
                        </FormErrorMessage>
                      )}

                      <Button type="submit">Add</Button>
                    </FormControl>
                  </form>
                </Flex>
              </Flex>
              <Flex
                fontFamily={"Montserrat"}
                flexWrap={"wrap"}
                alignItems={"center"}
                justifyContent={"center"}
                gap={3}
                flex={1}
                py={3}
              >
                <TaskCard el={1} />
              </Flex>
            </>
          ) : (
            <>
              <Flex flex={1} alignItems={"center"} justifyContent={"center"}>
                <Text textAlign={"center"} color={"brand.textPrimary"}>
                  Login to use
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Tasker;
