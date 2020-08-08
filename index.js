const express = require("express");
const projects = require("./utils/projects.js");

const server = express();

server.use(express.json());

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find((p) => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

function logRequests(req, res, next) {
  console.count("Req numbers...");

  return next();
}

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:index", (req, res) => {
  const { index } = req.params;

  return res.json(projects[index]);
});

server.post("/projects", checkProjectExists, (req, res) => {
  const { id, title } = req.body;
  const tasks = [""];

  projects.push({ id, title, tasks });

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(function (item, index) {
    if (id === item.id) {
      projects[index].title = title;
    }
  });

  return res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.map(function (item, index) {
    if (id === item.id) {
      projects.splice(index, 1);
    }
  });

  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.map(function (item, index) {
    if (id === item.id) {
      projects[index].tasks = title;
    }
  });

  return res.json(projects);
});

server.listen(3000);
