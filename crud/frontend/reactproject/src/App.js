import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import UserDetails from "./UserDetails"; // 1. Importe o novo componente

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UsersList />} />
                <Route path="/create" element={<CreateUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
                <Route path="/users/:id" element={<UserDetails />} /> {/* 2. Adicione esta nova rota */}
            </Routes>
        </Router>
    );
}

export default App;