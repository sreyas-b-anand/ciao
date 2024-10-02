interface TaskType {
  id: string; // Keep it as a string for better consistency
  task: string ;
  user: string |  null;
  timestamp: Date;
  status: string;
}

import { Flex, Text , Button } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import { doc , deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useTaskContext from "../../hooks/useTaskContext";


const TaskCard = ({task}: {task : TaskType} ) => {
  const {dispatch} = useTaskContext()
  const handleDelete =async()=>{
    await deleteDoc(doc(db , "tasks" , task.id))
    dispatch({
      type:'DELETE_TASK',
      payload : task
    })
  }
  
  return (
    <>
    <Flex borderRadius={4} p={5} rowGap={4} alignItems={'center'} direction={'column'} width={'280px'}  height={'150px'} bg={"brand.secondary"}>
        
        <Flex width={'100%'} fontSize={'large'} color={'brand.textPrimary'} alignItems={'baseline'} justifyContent={'space-between'} >
            {task.task}
            <Flex _hover={{cursor : 'pointer'}}>
            <MdDelete onClick={handleDelete} />
            </Flex>
        </Flex>
        
        
        <Flex width={'100%'} alignItems={"baseline"}  justifyContent={'flex-start'} gap={4}>
          <Text color={'brand.textSecondary'}>
            Status : {task.status}
          </Text>
          <Button color={'white'} bg={"red.400"} p={1} _hover={{bg:'brand.error'}}>Pending</Button>
         
        </Flex>
    </Flex>
    </>
  )   
}

export default TaskCard
