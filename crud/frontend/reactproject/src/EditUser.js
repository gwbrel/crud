import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // Corrigido import do Link [[3]]
import axios from "axios";

function EditUser() {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:9090/users/${id}`).then((res) => {
            setNome(res.data.nome);
            setEmail(res.data.email);
            setPswd(res.data.pswd); // Adicionado para controle completo do estado
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9090/users/${id}`, { nome, email, pswd })
            .then(() => navigate("/"))
            .catch(error => console.error("Erro ao atualizar:", error)); // Melhoria de tratamento de erro
    };

    return (
        <div> {/* Container para elementos irmãos */} 
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    required // Adicionado validação básica
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Nova senha" 
                    value={pswd} // Corrigido input não controlado [[9]]
                    onChange={(e) => setPswd(e.target.value)}
                />
                <button type="submit">Atualizar</button>
            </form>
            
            <Link to="/" className="back-button">
                Voltar para a lista
            </Link>
        </div>
    );
}

export default EditUser;