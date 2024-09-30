const express = require("express");
const router = express.Router();
const userCompanyController = require("../controllers/user_company.controller.js");

// Associar um usuário a uma empresa
router.post("/", userCompanyController.create);

// Listar todas as associações de usuários e empresas
router.get("/", userCompanyController.findAll);

// Remover a associação de um usuário a uma empresa
router.delete("/:userId/:companyId", userCompanyController.remove);

module.exports = router;
