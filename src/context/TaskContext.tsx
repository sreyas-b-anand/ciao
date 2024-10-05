import React, { createContext, Dispatch, useReducer } from "react";

interface TaskData {
  id: string; // Keep it as a string for better consistency
  task: string;
  user: string | null;
  timestamp: Date;
  status: string;
}

type ActionType = {
  type: string;
  payload: TaskData | TaskData[] | null;
};

type StateType = {
  tasks: TaskData[];
};

type TaskContextType = {
  taskState: StateType;
  dispatch: Dispatch<ActionType>;
} | null;

export const TaskContext = createContext<TaskContextType>(null);

const taskReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        tasks: action.payload as TaskData[], // Ensure tasks is always an array
      };

    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter(
          (task) => task.id !== (action.payload as TaskData)?.id
        ), // Adjusted for a single task deletion
      };

    default:
      return state;
  }
};

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [taskState, dispatch] = useReducer(taskReducer, {
    tasks: [],
  });

  console.log("reducer state ", taskState);

  return (
    <TaskContext.Provider value={{ taskState, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
