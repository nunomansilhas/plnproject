const Service = require("../models/services.model.js");

// Criar um novo serviço (POST /api/services)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status, // Assuming there is a status field
    });

    Service.create(service, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todos os serviços (GET /api/services)
exports.findAll = (req, res) => {
    Service.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Obter um serviço específico pelo ID (GET /api/services/:id)
exports.findById = (req, res) => {
    Service.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not find service with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar todos os dados de um serviço (PUT /api/services/:id)
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    Service.updateById(req.params.id, new Service(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating service with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar apenas o nome de um serviço (PUT /api/services/:id/name)
exports.updateName = (req, res) => {
    if (!req.body || !req.body.name) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    Service.updateNameById(req.params.id, req.body.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating service name with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar apenas a descrição de um serviço (PUT /api/services/:id/description)
exports.updateDescription = (req, res) => {
    if (!req.body || !req.body.description) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    Service.updateDescriptionById(req.params.id, req.body.description, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating service description with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Remover um serviço (DELETE /api/services/:id)
exports.delete = (req, res) => {
    Service.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not delete service with id " + req.params.id });
            }
        } else res.send({ message: `Service was deleted successfully!` });
    });
};
