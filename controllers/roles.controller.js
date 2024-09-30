const Role = require("../models/roles.model.js");

// Criar um novo papel (POST /roles)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const role = new Role({
        name: req.body.name,
    });

    Role.create(role, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todos os papéis (GET /roles)
exports.findAll = (req, res) => {
    Role.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Obter um papel específico pelo ID (GET /roles/:id)
exports.findById = (req, res) => {
    Role.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Role not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not find role with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar todos os dados de um papel (PUT /roles/:id)
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    Role.updateById(req.params.id, new Role(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Role not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating role with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar o nome de um papel específico (PUT /roles/:id/name)
exports.updateName = (req, res) => {
    if (!req.body || !req.body.name) {
        res.status(400).send({ message: "Name cannot be empty!" });
        return;
    }

    Role.updateName(req.params.id, req.body.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Role not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating role name with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Remover um papel específico (DELETE /roles/:id)
exports.delete = (req, res) => {
    Role.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Role not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not delete role with id " + req.params.id });
            }
        } else res.send({ message: `Role was deleted successfully!` });
    });
};
