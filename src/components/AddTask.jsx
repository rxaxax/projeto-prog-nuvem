import { useState } from "react";
import { createTask } from "../api/back4app";
import Input from "./Input";
import Button from "./Button";

function AddTask({ setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (title, description) => {
    try {
      const newTask = await createTask(title, description);
      setTasks((prevTasks) => [...prevTasks, newTask]); // Atualiza o estado com a nova tarefa
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  };

  return (
    <>
      <div className="space-y-4 p-6 bg-stone-200 rounded-md shadow flex flex-col">
        <Input
          type="text"
          placeholder="Digite o título da tarefa"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          type="text"
          placeholder="Digite a descrição da tarefa (opcional)"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button
          onClick={() => {
            if (!title) {
              return alert("Preencha o título da tarefa.");
            }

            handleCreate(title, description);
            setTitle("");
            setDescription("");
          }}
          addStyles="font-medium "
        >
          Adicionar
        </Button>
      </div>
    </>
  );
}

export default AddTask;