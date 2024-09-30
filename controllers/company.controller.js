const Company = require("../models/companies.model.js");

// Criar uma nova empresa (POST /companies)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const company = new Company({
        name: req.body.name,
        address: req.body.address,
    });

    Company.create(company, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todas as empresas (GET /companies)
exports.findAll = (req, res) => {
    Company.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Obter uma empresa pelo ID (GET /companies/:id)
exports.findById = (req, res) => {
    Company.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Company not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not find company with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar uma empresa (PUT /companies/:id)
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    Company.updateById(req.params.id, new Company(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Company not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating company with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Remover uma empresa (DELETE /companies/:id)
exports.delete = (req, res) => {
    Company.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Company not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not delete company with id " + req.params.id });
            }
        } else res.send({ message: `Company was deleted successfully!` });
    });
};
