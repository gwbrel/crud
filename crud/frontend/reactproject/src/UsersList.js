import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UsersList.css";

function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9090/users/")
            .then((res) => {
                setUsers(res.data);
            });
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://localhost:9090/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            });
    };

    return (
        <div className="users-container">
            <h2>Lista de Usuários</h2>
            <Link to="/create" className="create-btn">Criar Usuário</Link>
            
            <ul className="users-list">
                {users.map((user) => (
                    <li key={user.id} className="user-card">
                        <div className="user-main-info">
                            <span className="user-name">{user.nome}</span>
                        </div>
                        
                        <div className="action-buttons">
                            <Link to={`/users/${user.id}`} className="btn details-btn">
                                Detalhes
                            </Link>
                            
                            <Link to={`/edit/${user.id}`} className="btn edit-btn">
                                Editar
                            </Link>
                            
                            <button 
                                onClick={() => deleteUser(user.id)}
                                className="btn delete-btn"
                            >
                                Deletar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UsersList;