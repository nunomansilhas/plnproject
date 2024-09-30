const Permission = require("../models/permissions.model.js");

// Criar uma nova permissão (POST /permissions)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const permission = new Permission({
        name: req.body.name,
    });

    Permission.create(permission, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todas as permissões (GET /permissions)
exports.findAll = (req, res) => {
    Permission.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Obter uma permissão específica pelo ID (GET /permissions/:id)
exports.findById = (req, res) => {
    Permission.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Permission not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not find permission with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar todos os dados de uma permissão (PUT /permissions/:id)
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    Permission.updateById(req.params.id, new Permission(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Permission not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating permission with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar o nome de uma permissão específica (PUT /permissions/:id/name)
exports.updateName = (req, res) => {
    if (!req.body || !req.body.name) {
        res.status(400).send({ message: "Name cannot be empty!" });
        return;
    }

    Permission.updateName(req.params.id, req.body.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Permission not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating permission name with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Remover uma permissão específica (DELETE /permissions/:id)
exports.delete = (req, res) => {
    Permission.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Permission not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not delete permission with id " + req.params.id });
            }
        } else res.send({ message: `Permission was deleted successfully!` });
    });
};
