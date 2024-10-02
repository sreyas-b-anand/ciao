interface TaskData {
  id: string;
  task: string;
  user: string;
  timestamp: Date;
  status: string;
}

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

import {  lazy, Suspense, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import useTaskContext from "../hooks/useTaskContext";

import Loading from "../components/loader/Loading";
const TaskLoader = lazy(()=> import('../components/TaskerCard/TaskSection'))
const Tasker = () => {
  const { taskState, dispatch } = useTaskContext();

  console.log("taskdata", taskState);
  const { user } = useAuthContext();
  console.log("in tasker user", user?.email); ////////////////////////////////////////////////

  
  useEffect(() => {
    if (!user?.email) return;

    const q = query(collection(db, "tasks"), where("user", "==", user.email));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const taskData: TaskData[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as TaskData)
      );

      // Dispatch only if taskData has changed
      if (JSON.stringify(taskData) !== JSON.stringify(taskState.tasks)) {
        dispatch({
          type: "GET_TASKS",
          payload: taskData,
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch, user?.email]);

 
  const [input, setInput] = useState<string>("");
  const isError = input === "";
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        user: user?.email,
        timestamp: new Date(),
        status: "pending",
      });
    
      setInput("");
    } catch (error) {
      console.log(error)
      
    }
  };
  console.log("task state ",taskState)
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
          {user ? (
            <>
              <Flex fontFamily={"Montserrat"} color={"white"}>
                <Flex
                  flex={1}
                  alignItems={"center"}
                  gap={3}
                  justifyContent={"center"}
                >
                  <form onSubmit={handleClick}>
                    <Flex alignItems={"baseline"} justifyContent={"center"}>
                      <FormControl
                        isInvalid={isError}
                        display={"flex"}
                        p={3}
                        py={5}
                        flexDir={"column"}
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
                      </FormControl>
                      <Button type="submit">Add</Button>
                    </Flex>
                  </form>
                </Flex>
              </Flex>
              <Suspense fallback={<Loading />}>
                <TaskLoader taskState={taskState.tasks}/>
              </Suspense>
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
