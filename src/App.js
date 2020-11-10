import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const repository = [];
  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
