import axios from "axios";

const api = axios.create({
  baseURL: "https://parseapi.back4app.com/",
  headers: {
    "X-Parse-Application-Id": import.meta.env.VITE_APP_APPLICATION_ID,
    "X-Parse-REST-API-Key": import.meta.env.VITE_APP_REST_API_KEY,
    "Content-Type": "application/json",
  },
});

//CRUD

export const createTask = async (title, description) => {
  try {
    const sessionToken = localStorage.getItem("sessionToken");

    if (!sessionToken) {
      throw new Error("Usuário não autenticado.");
    }

    const response = await api.post(
      "/classes/Task",
      {
        title,
        description,
        createdBy: {
          __type: "Pointer",
          className: "_User",
          objectId: localStorage.getItem("userId"), // ID do usuário logado
        },
      },
      {
        headers: {
          "X-Parse-Session-Token": sessionToken, // Adiciona o token de sessão
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao criar a tarefa:", error);
    throw new Error(error.response?.data?.error || "Erro ao criar tarefa.");
  }
};

export const readTasks = async () => {
  try {
    const sessionToken = localStorage.getItem("sessionToken");

    if (!sessionToken) {
      throw new Error("Usuário não autenticado.");
    }

    const userId = localStorage.getItem("userId");

    const response = await api.get("/classes/Task", {
      params: {
        where: JSON.stringify({
          createdBy: {
            __type: "Pointer",
            className: "_User",
            objectId: userId,
          },
        }),
      },
      headers: {
        "X-Parse-Session-Token": sessionToken,
      },
    });

    return response.data.results; // Retorna as tarefas do usuário
  } catch (error) {
    console.error("Erro ao buscar tarefas do usuário:", error);
    throw new Error(error.response?.data?.error || "Erro ao buscar tarefas.");
  }
};

export const updateTask = async (objectId, updatedFields) => {
  try {
    const sessionToken = localStorage.getItem("sessionToken");

    const response = await api.put(`/classes/Task/${objectId}`, updatedFields, {
      headers: {
        "X-Parse-Session-Token": sessionToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
    throw error;
  }
};

export const deleteTask = async (objectId) => {
  try {
    const sessionToken = localStorage.getItem("sessionToken");

    const response = await api.delete(`/classes/Task/${objectId}`, {
      headers: {
        "X-Parse-Session-Token": sessionToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
    throw error;
  }
};

//rotas de usuário

export const createUser = async (username, email, password) => {
  try {
    const response = await api.post("/users", {
      name: username,
      username: email,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao criar usuário:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    localStorage.setItem("sessionToken", response.data.sessionToken);
    localStorage.setItem("userId", response.data.objectId);
    return response.data;
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    throw new Error(error.response?.data?.error || "Erro ao realizar login");
  }
};
