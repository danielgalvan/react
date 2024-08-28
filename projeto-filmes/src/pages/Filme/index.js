import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './filme.css';
  
function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'b3c2a8f74a0e861f1d0342cd52ca657e',
          language: 'pt-BR'
        }
      }).then((response) => {
        setFilme(response.data);
        setLoading(false);
      }).catch(() => {
        navigate('/', { replace: true });
        return;
      });
    }

    loadFilme();

    return () => {
      console.log('componente desmontado')
    }
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@danielFlix");

    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilmes) {
      toast.warn("Não foi possivel salvar este filme, o mesmo ja esta em sua lista de favoritos!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@danielFlix", JSON.stringify(filmesSalvos));
    toast.success("Filme Salvo com Sucesso!!!");
  }

  if (loading) {
    return (
      <div className='filme-info'>
        <h2>Carregando Detalhe do Filme...</h2>
      </div>
    );
  }

    return (
      <div className="Filme-info">
         <h1>{filme.title}</h1>
         <img src={'https://image.tmdb.org/t/p/original' + filme.backdrop_path} alt={filme.title}></img>

         <h3>Sinopse</h3>
         <span>{filme.overview}</span>
         <strong>Avaliação: {filme.vote_average.toFixed(1)}/10</strong>

         <div className='buttons'>
          <button onClick={salvarFilme}>Salvar</button>
          <button>
            <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
              Trailer
            </a>
          </button>

         </div>
      </div>
    );
  }
  
  export default Filme;
  