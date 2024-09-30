const User = require("../models/user.model.js");

// Criar um novo usuário (POST /api/users)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, // Não armazene senhas em texto simples em produção
        role: req.body.role
    });

    User.create(user, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todos os usuários (GET /api/users)
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Obter um usuário específico pelo ID (GET /api/users/:id)
exports.findById = (req, res) => {
    User.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `User not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not retrieve user with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar todos os dados de um usuário (PUT /api/users/:id)
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    User.updateById(req.params.id, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `User not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating user with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar a senha de um usuário (PUT /api/users/:id/password)
exports.updatePassword = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    User.updatePassword(req.params.id, req.body.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `User not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating password for user with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar o email de um usuário (PUT /api/users/:id/email)
exports.updateEmail = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    User.updateEmail(req.params.id, req.body.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `User not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating email for user with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Remover um usuário (DELETE /api/users/:id)
exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `User not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not delete user with id " + req.params.id });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};
