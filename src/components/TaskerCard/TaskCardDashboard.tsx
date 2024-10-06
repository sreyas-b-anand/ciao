type TaskType = {
  id: string; // Keep it as a string for better consistency
  task: string;
  user: string | null;
  timestamp: Date;
  status: string;
};

import { Flex, Text} from "@chakra-ui/react";

const TaskCardDashboard = ({ task }: { task: TaskType }) => {
  return (
    <Flex
    padding={4}
      bg={"brand.secondary"}
      flex={2}
      alignItems={"start"}
      justifyContent={"center"}
      color={"brand.textPrimary"}
      fontFamily={'Montserrat'}
      borderRadius={3}
      direction={'column'}
      gap={3}
    >
      <Flex >{task?.task}</Flex>
      <Flex  gap={2} alignItems={'baseline'} justifyContent={'center'}  >
        status : <Text borderRadius={3} bg={'brand.error'} py={1} px={2}>{task?.status}</Text>
      </Flex>
    </Flex>
  );
};

export default TaskCardDashboard;
