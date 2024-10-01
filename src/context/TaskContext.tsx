interface TaskData {
    id: string;
    task: string;
    user: string;
    timestamp: Date;
    status: string;
  }
  
  type ActionType = {
    type: string;
    payload: TaskData[] | null;
  };
  
  type StateType = {
    tasks: TaskData[];
  };
  
  type TaskContextTypes = {
    taskState: StateType;
    dispatch: Dispatch<ActionType>;
  } | null;
  
  import React, { createContext, Dispatch, useReducer } from "react";
  
  export const TaskContext = createContext<TaskContextTypes>(null);
  
  const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
    const taskReducer = (state: StateType, action: ActionType) => {
      switch (action.type) {
        case "GET_TASKS":
          return {
            tasks: action.payload || [], // Ensure tasks is always an array
          };
  
        case "DELETE_TASK":
          return {
            tasks: state.tasks.filter((task) => task.id !== action.payload?.[0]?.id), // Adjust if payload is an array
          };
  
        case "ADD_TASK":
          return {
            tasks: [...state.tasks, ...(action.payload || [])], // Ensure immutability
          };
  
        default:
          return state;
      }
    };
    const [taskState, dispatch] = useReducer(taskReducer, {
        tasks: [],
    });
    console.log(taskState)
  
    return (
      <TaskContext.Provider value={{ taskState, dispatch }}>
        {children}
      </TaskContext.Provider>
    );
  };
  
  export default TaskContextProvider;
  