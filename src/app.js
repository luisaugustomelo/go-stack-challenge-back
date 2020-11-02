const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  let { title, url, techs } = request.body;
  
  let repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.status(201).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  let { id } = request.params;
  let { title, url, techs } = request.body;

  let dataIndex = repositories.findIndex((repository) => {
    return repository.id == id;
  })

  if(dataIndex < 0) {
    return response.status(400).json({message: 'repository not found'});
  } else {
    repositories[dataIndex].title = title;
    repositories[dataIndex].url = url;
    repositories[dataIndex].techs = techs;

    return response.status(200).json(repositories[dataIndex]);
  }
});

app.delete("/repositories/:id", (request, response) => {
  let { id } = request.params;
  let dataIndex = repositories.findIndex((repository) => {
    return repository.id == id;
  })

  if(dataIndex < 0) {
    return response.status(400).json({message: 'Doesn\'t exists this repository'});
  } else {
    let deleted = repositories.splice(dataIndex, 1);
    return response.status(204).json(deleted);
  }
});

app.post("/repositories/:id/like", (request, response) => {
  let { id } = request.params;
  let dataIndex = repositories.findIndex((repository) => {
    return repository.id == id;
  })

  if(dataIndex < 0) {
    return response.status(400).json({message: 'Doesn\'t exists this repository'});
  } else {
    repositories[dataIndex].likes++;
    return response.json({likes: repositories[dataIndex].likes});
  }
});

module.exports = app;
