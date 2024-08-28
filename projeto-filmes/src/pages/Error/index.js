import { Link } from 'react-router-dom';
import './error.css';

function Error() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>PAGE NOT FOUND</h2>
            <Link to={"/"}>Voltar</Link> <br/>
        </div>
    )
}

export default Error;