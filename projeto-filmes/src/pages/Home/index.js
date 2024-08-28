import { useEffect, useState } from 'react';
import api from './../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilms() {
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: 'b3c2a8f74a0e861f1d0342cd52ca657e',
          language: 'pt-BR',
          page: 1
        }
      });

      setFilmes(response.data.results.splice(0,15));
      setLoading(false);
    };

    loadFilms()
  }, []);

  if (loading) {
    return (
      <div className='loader'>
        <h2>Carregando Filmes...</h2>
      </div>
    );
  }
    return (
      <div className='container'>
        <div className='list'>
          {filmes.map((filme) => {
            return(
              <article key={filme.id}>
                <strong>{filme.title}</strong>
                <img src={'https://image.tmdb.org/t/p/original' + filme.poster_path} alt={filme.title}></img>
                <Link to={"/filme/"+filme.id}> Acessar</Link> <br/>
              </article>
            )
          })}
        </div>
      </div>
    );
  }
  
  export default Home;
  