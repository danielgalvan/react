import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favoritos.css';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@danielFlix");
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluirFilme(id) {
        let filmesFiltrados = filmes.filter((item) => {
            return (item.id !== id);
        });

        setFilmes(filmesFiltrados);
        localStorage.setItem("@danielFlix", JSON.stringify(filmesFiltrados));
        toast.success("O filme foi excluido com sucesso dos favoritos");
    }

    return (
    <div className="favoritos">
        <h1>Meus Filmes Favoritos</h1>

        {!filmes.length  && <span>Não há nenhum filme favorito salvo</span>}

        <ul>
            {filmes.map((filme) => {
                return (
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                            <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
    );
}

export default Favoritos;