import { ChevronLeftIcon, PencilLine, Check } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateTask } from "../api/back4app";

function TaskPage() {
  const sessionToken = localStorage.getItem("sessionToken");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionToken || !userId) {
      alert("Usuário não autorizado! Faça login para acessar a aplicação.");
      navigate("/");
    }
  }, [sessionToken, userId, navigate]);

  const [searchParams] = useSearchParams();
  const objectId = searchParams.get("objectId");
  const initialTitle = searchParams.get("title");
  const initialDescription = searchParams.get("description");
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (objectId) => {
    try {
      await updateTask(objectId, {
        title: title,
        description: description,
      });
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }

    setIsEditing(false);
  };

  return (
    <div className="h-screen w-screen bg-cyan-800 p-6 flex justify-center">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
          <button
            className="absolute left-0 top-0 bottom-0 text-stone-50"
            onClick={() => navigate("/app")}
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-3xl text-stone-50 font-bold text-center">
            Detalhes da tarefa
          </h1>
        </div>

        <div className="bg-stone-200 p-4 rounded-md">
          <div className="flex items-center relative">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl text-cyan-700 font-bold border-b border-cyan-700 focus:outline-none pr-10 w-full"
              />
            ) : (
              <h2 className="text-xl text-cyan-700 font-bold pr-10">{title}</h2>
            )}
            <button
              className="absolute right-0 top-0 bottom-0 text-cyan-700"
              onClick={() =>
                isEditing ? handleUpdate(objectId) : setIsEditing(true)
              }
            >
              {isEditing ? <Check /> : <PencilLine />}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-cyan-700 border border-cyan-700 rounded-md w-full focus:outline-none p-2 mt-2"
              rows="4"
            />
          ) : (
            <p className="text-cyan-700">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskPage;