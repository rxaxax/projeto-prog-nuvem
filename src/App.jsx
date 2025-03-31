import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import AddTask from "./components/AddTask";
import { readTasks } from "./api/back4app";
import { useNavigate } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);
  const sessionToken = localStorage.getItem("sessionToken");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionToken || !userId) {
      alert("Usuário não autorizado! Faça login para acessar a aplicação.");
      navigate("/"); // Redireciona para a página de login
    }
  }, [sessionToken, userId, navigate]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await readTasks();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchTasks();
  }, [tasks]);

  const current = new Date();
  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const date = `${diasDaSemana[current.getDay()]} - ${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  return (
    <>
      <div className="w-screen min-h-screen bg-cyan-800 flex justify-center p-6">
        <div className="w-[500px] space-y-4">
          <h1 className="text-3xl text-stone-50 font-bold text-center">
            Lista de tarefas
          </h1>
          <p className="text-lg text-stone-50 text-center">{date}</p>
          {tasks && tasks.length > 0 && <ToDoList tasks={tasks} />}
          <AddTask setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}

export default App;