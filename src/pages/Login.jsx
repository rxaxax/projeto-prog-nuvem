import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/back4app";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    const userId = localStorage.getItem("userId");
    if (sessionToken && userId) {
      navigate("/app");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      const userData = await loginUser(email, password);
      alert(`Bem-vindo, ${userData.name}!`);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      navigate("/app");
    } catch (err) {
      setError(err.message || "Erro ao realizar login");
    }
  };

  return (
    <div className="h-screen w-screen bg-cyan-800 flex flex-col justify-center items-center">
      <form className="bg-stone-200 p-6 rounded-md space-y-4 shadow-md w-[400px]">
        <h1 className="text-2xl font-bold text-cyan-700 text-center">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
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
        <Button onClick={handleLogin} addStyles="w-full font-medium">
          Entrar
        </Button>
      </form>
      <p className="my-4 text-stone-50">
        Não tem uma conta?{" "}
        <Link to="/signup" className="font-bold hover:underline">
          Cadastre-se
        </Link>{" "}
        aqui!
      </p>
    </div>
  );
}

export default Login;