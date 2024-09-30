module.exports = (app) => {
    const services = require("../controllers/services.controller.js");
    const router = require("express").Router();

    // Criar um novo serviço
    router.post("/", services.create);

    // Listar todos os serviços
    router.get("/", services.findAll);

    // Obter um serviço específico pelo ID
    router.get("/:id", services.findById);

    // Atualizar todos os dados de um serviço
    router.put("/:id", services.update);

    // Atualizar apenas o nome de um serviço
    router.put("/:id/name", services.updateName);

    // Atualizar apenas a descrição de um serviço
    router.put("/:id/description", services.updateDescription);

    // Remover um serviço
    router.delete("/:id", services.delete);

    app.use('/api/services', router);
};
