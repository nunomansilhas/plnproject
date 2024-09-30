const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");

// Criar um novo usuário
router.post("/", userController.create);

// Listar todos os usuários
router.get("/", userController.findAll);

// Obter um usuário específico pelo ID
router.get("/:id", userController.findById);

// Atualizar todos os dados de um usuário
router.put("/:id", userController.update);

// Atualizar a senha de um usuário específico
router.put("/:id/password", userController.updatePassword);

// Atualizar o email de um usuário específico
router.put("/:id/email", userController.updateEmail);

// Remover um usuário específico
router.delete("/:id", userController.delete);

module.exports = router;
