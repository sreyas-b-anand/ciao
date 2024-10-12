interface TaskType {
  id: string; // Keep it as a string for better consistency
  task: string;
  user: string | null;
  timestamp: Date;
  status: boolean;
}

import { Flex, Text, Button } from "@chakra-ui/react";
import { MdDelete, MdDone } from "react-icons/md";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useTaskContext from "../../hooks/useTaskContext";

const TaskCard = ({ task }: { task: TaskType }) => {
  const handleClick = async () => {
    await updateDoc(doc(db, "tasks", task.id), {
      status: true,
    });
    
  };
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
          <Button p={0} _hover={'none'} background={'transparent'} onClick={handleClick}><MdDone color="white" size={25} /></Button>
          <Flex _hover={{ cursor: "pointer" }}>
            <MdDelete onClick={handleDelete} />
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
