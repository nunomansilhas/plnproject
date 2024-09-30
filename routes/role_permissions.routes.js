module.exports = (app) => {
    const rolePermissions = require("../controllers/role_permissions.controller.js");
    const router = require("express").Router();

    // Associar uma permissão a um papel
    router.post("/", rolePermissions.create);

    // Listar todas as associações de papéis e permissões
    router.get("/", rolePermissions.findAll);

    // Remover uma associação de papel e permissão
    router.delete("/:roleId/:permissionId", rolePermissions.delete);

    app.use('/api/role_permissions', router);
};
