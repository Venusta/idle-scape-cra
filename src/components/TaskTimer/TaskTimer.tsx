/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector, shallowEqual } from "react-redux";
import React, { useState, useEffect } from "react";
import { combatTask } from "../../tasks/combat";
import { RootState, useAppDispatch } from "../../app/store";
import { TaskState, processQueue, handleActiveTask } from "../../app/slices/task";
import { cookingTask } from "../../tasks/cooking";
import { fishingTask } from "../../tasks/fishing";

export const TaskTimer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(new Date());
  const tasks: TaskState = useSelector((state: RootState) => state.tasks, shallowEqual);

  const handleTask = () => {
    const characterIds = Object.keys(tasks);

    characterIds.forEach((characterId) => {
      const { queue, active } = tasks[characterId];

      if (queue.length > 0 && active === false) {
        const task = queue[0];
        const { taskType } = task;
        console.log(taskType);

        switch (taskType) {
          case "cooking": {
            dispatch(processQueue({ characterId, task: cookingTask(task) }));
            break;
          }
          case "fishing": {
            dispatch(processQueue({ characterId, task: fishingTask(task) }));
            break;
          }
          case "combat": {
            dispatch(processQueue({ characterId, task: combatTask(task) }));
            break;
          }
          default:
            console.log(`No tasktype found: ${taskType}`);
        }
        console.log("This should only happen once per task");
      }

      const task = tasks[characterId].activeTask;
      if (active && task) {
        const { when } = task;

        if (time.valueOf() > when) {
          console.log("TASK COMPLETE!!!!!!!!");
          dispatch(handleActiveTask(task));
        }
      }
    });
  };

  useEffect(() => { // todo maybe make this outside of react
    console.log("Tick!");
    handleTask();

    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleTask, time]);

  return (
    <div />
  );
};
