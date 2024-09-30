module.exports = (app) => {
    const permissions = require("../controllers/permissions.controller.js");
    const router = require("express").Router();

    router.post("/", permissions.create);
    router.get("/", permissions.findAll);
    router.get("/:id", permissions.findById);
    router.put("/:id", permissions.update);
    router.put("/:id/name", permissions.updateName);
    router.delete("/:id", permissions.delete);

    app.use('/api/permissions', router);
};
