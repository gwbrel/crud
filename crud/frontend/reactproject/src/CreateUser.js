import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:9090/users/", { nome, email, pswd }).then(() => {
            navigate("/");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" onChange={(e) => setPswd(e.target.value)} />
            <button type="submit">Criar</button>
        </form>
    );
}

export default CreateUser;
