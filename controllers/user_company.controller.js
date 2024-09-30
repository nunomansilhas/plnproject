const UserCompany = require("../models/user_company.model.js");

// Associar um usuário a uma empresa (POST /api/user_company)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const userCompany = new UserCompany({
        userId: req.body.userId,
        companyId: req.body.companyId,
    });

    UserCompany.create(userCompany, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todas as associações de usuários e empresas (GET /api/user_company)
exports.findAll = (req, res) => {
    UserCompany.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Remover a associação de um usuário a uma empresa (DELETE /api/user_company/:userId/:companyId)
exports.remove = (req, res) => {
    UserCompany.remove(req.params.userId, req.params.companyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Association not found for userId ${req.params.userId} and companyId ${req.params.companyId}` });
            } else {
                res.status(500).send({ message: "Could not delete association" });
            }
        } else res.send({ message: `Association between userId ${req.params.userId} and companyId ${req.params.companyId} was deleted successfully!` });
    });
};
