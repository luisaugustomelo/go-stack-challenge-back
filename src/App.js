import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  async function handleAddRepository() {
    const repository = {
      title: `Object inserted ${Date.now()}`,
      url: `https://github.com/luisaugustomelo/${Date.now()}`,
      techs: ["React", "Node.js", "Javascript"]
    }

    api.post('/repositories', repository)
    .then((response) => {
      setRepository([...repositories, response.data])
    }).catch(error => {
      console.log(error)
    })
    
    // TODO
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(repository => repository.id === id);
    repositories.splice(index, 1);
    setRepository([...repositories]);

    // TODO
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository([...response.data])
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (
          <li key={repository.id}>
            { repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
