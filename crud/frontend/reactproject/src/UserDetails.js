import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:9090/users/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar usuário:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <div className="user-details-page">
      <h2>Detalhes do Usuário</h2>
      <div className="detail-item">
        <strong>ID:</strong> {user.id}
      </div>
      <div className="detail-item">
        <strong>Nome:</strong> {user.nome}
      </div>
      <div className="detail-item">
        <strong>Email:</strong> {user.email}
      </div>

      <Link to="/" className="back-button">
        Voltar para a lista
      </Link>
    </div>
  );
}

export default UserDetails;