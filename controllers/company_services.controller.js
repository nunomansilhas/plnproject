const CompanyService = require("../models/company_services.model.js");

// Adicionar um serviço para uma empresa (POST /company_services)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const companyService = new CompanyService({
        companyId: req.body.companyId,
        serviceId: req.body.serviceId,
        subscriptionEnd: req.body.subscriptionEnd,
        status: req.body.status,
    });

    CompanyService.create(companyService, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todos os serviços de todas as empresas (GET /company_services)
exports.findAll = (req, res) => {
    CompanyService.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Obter um serviço específico pelo ID (GET /company_services/:id)
exports.findById = (req, res) => {
    CompanyService.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not find service with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Atualizar todos os dados de um serviço (PUT /company_services/:id)
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    CompanyService.updateById(req.params.id, new CompanyService(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating service with id " + req.params.id });
            }
        } else res.send(data);
    });
};

// Ativar ou desativar um serviço específico (PUT /company_services/:id/enabled)
exports.toggleStatus = (req, res) => {
    CompanyService.toggleStatus(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error toggling status of service with id " + req.params.id });
            }
        } else res.send({ message: `Service status toggled successfully!` });
    });
};

// Atualizar dados de assinatura de um serviço (PUT /company_services/:id/subscription)
exports.updateSubscription = (req, res) => {
    if (!req.body.subscriptionEnd) {
        res.status(400).send({ message: "Subscription end date cannot be empty!" });
        return;
    }

    CompanyService.updateSubscription(req.params.id, req.body.subscriptionEnd, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Error updating subscription of service with id " + req.params.id });
            }
        } else res.send({ message: `Service subscription updated successfully!` });
    });
};

// Remover um serviço específico (DELETE /company_services/:id)
exports.delete = (req, res) => {
    CompanyService.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Service not found with id ${req.params.id}` });
            } else {
                res.status(500).send({ message: "Could not delete service with id " + req.params.id });
            }
        } else res.send({ message: `Service was deleted successfully!` });
    });
};
