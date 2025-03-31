import { Check, TrashIcon } from "lucide-react";
import { deleteTask, updateTask } from "../api/back4app";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ToDoList({ tasks }) {
  const sortedTasks = [...tasks].sort((a, b) => {
    return a.isCompleted - b.isCompleted; // false (0) antes de true (1)
  });

  const navigate = useNavigate();

  const seeTaskDetails = (task) => {
    const query = new URLSearchParams();
    query.set("objectId", task.objectId);
    query.set("title", task.title);
    query.set("description", task.description);
    query.set("isCompleted", task.isCompleted);
    navigate(`/task?${query.toString()}`);
  };

  const updateCompletionState = async (task) => {
    const changeCompletionState = task.isCompleted
      ? (task.isCompleted = false)
      : (task.isCompleted = true);
    try {
      await updateTask(task.objectId, {
        isCompleted: changeCompletionState,
      });
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  const handleDelete = async (objectId) => {
    try {
      await deleteTask(objectId);
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  return (
    <>
      <ul className="space-y-4 p-6 bg-stone-200 rounded-md shadow">
        {sortedTasks.map((task) => (
          <li key={task.objectId} className="flex gap-2">
            <Button
              onClick={() => seeTaskDetails(task)}
              addStyles={`text-left w-full ${
                task.isCompleted && "line-through"
              }`}
            >
              {task.title}
            </Button>
            <Button
              onClick={() => {
                updateCompletionState(task);
              }}
              addStyles="hover:text-green-500  active:text-green-500"
            >
              <Check />
            </Button>
            <Button
              onClick={() => {
                const confirmDelete = confirm(
                  'Clique em "ok" para confirmar a exclusão da tarefa!'
                );
                if (confirmDelete) {
                  handleDelete(task.objectId);
                }
              }}
              addStyles="hover:text-red-500 active:text-red-500"
            >
              <TrashIcon />
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ToDoList;