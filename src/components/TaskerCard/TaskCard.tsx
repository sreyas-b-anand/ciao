interface TaskType {
  id: string; // Keep it as a string for better consistency
  task: string;
  user: string | null;
  timestamp: Date;
  status: boolean;
}

import { Flex, Text, Button, Input } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useTaskContext from "../../hooks/useTaskContext";
import { useState } from "react";

const TaskCard = ({ task }: { task: TaskType }) => {
  const [statusTask , setStatusTask] = useState(task.status)
  const { dispatch } = useTaskContext();
  const handleDelete = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
    dispatch({
      type: "DELETE_TASK",
      payload: task,
    });
  };

  return (
    <>
      <Flex
        borderRadius={4}
        p={5}
        rowGap={4}
        alignItems={"center"}
        direction={"column"}
        width={"280px"}
        
        bg={"brand.secondary"}
      >
        <Flex
          width={"100%"}
          fontSize={"large"}
          color={"brand.textPrimary"}
          alignItems={"baseline"}
          justifyContent={"space-between"}
        >
          <Text>{task.task}</Text>
          <input type="checkbox" id="myCheck"  onClick={()=> console.log("Hello")}/>
          <Flex _hover={{ cursor: "pointer" }}>
            <MdDelete  onClick={handleDelete} />
          </Flex>
        </Flex>

        {/*
        <Flex
          width={"100%"}
          alignItems={"baseline"}
          justifyContent={"flex-start"}
          gap={4}
        >
          <Text color={"brand.textSecondary"}>Status : {task.status}</Text>
          <Button
            color={"white"}
            onClick={()=>setStatusTask(!statusTask)}
            bg={!statusTask ? "red.400" : "green.500"}
            p={1}
            _hover={'none'}
            
          >
           {!statusTask ? "pending" : "completed"}
          </Button>
        </Flex>
          */}
      </Flex>
    </>
  );
};

export default TaskCard;
