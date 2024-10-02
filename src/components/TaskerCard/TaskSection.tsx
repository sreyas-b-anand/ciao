interface TaskType {
  id: string; // Keep it as a string for better consistency
  task: string;
  user: string | null;
  timestamp: Date;
  status: string;
}
import { Flex } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
const TaskSection = ({ taskState }: { taskState: TaskType[] }) => {
  return (
    <>
      <Flex
        fontFamily={"Montserrat"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        flex={1}
        py={3}
      >
        {taskState &&
          taskState.map(
            (
              task: {
                id: string;
                task: string;
                user: string | null;
                timestamp: Date;
                status: string;
              },
              index: number
            ) => <TaskCard task={task} key={index} />
          )}
        {!taskState && (
          <p className="text-center text-white ">No tasks to show</p>
        )}
      </Flex>
    </>
  );
};

export default TaskSection;
