import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/back4app";
import Input from "../components/Input";
import Button from "../components/Button";
import { ChevronLeftIcon } from "lucide-react";

function SignUp() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      await createUser(username, email, password);
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (err) {
      if (err.response.data.code == 202) {
        err.message = "Já existe uma conta para este endereço de e-mail!";
      }

      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen bg-cyan-800 flex justify-center items-center">
      <form className="bg-stone-200 p-6 rounded-md space-y-4 shadow-md w-[400px]">
        <div className="relative">
        <button
            className="absolute left-0 top-0 bottom-0 text-cyan-700"
            onClick={() => navigate("/")}
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-2xl font-bold text-cyan-700 text-center">
          Cadastro
        </h1>
        </div>
        
        {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}
        <Input
          type="text"
          placeholder="Nome do usuário"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp} addStyles="w-full font-medium">
          Cadastrar
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
