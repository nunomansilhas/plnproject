module.exports = (app) => {
    const roles = require("../controllers/roles.controller.js");
    const router = require("express").Router();

    router.post("/", roles.create);
    router.get("/", roles.findAll);
    router.get("/:id", roles.findById);
    router.put("/:id", roles.update);
    router.put("/:id/name", roles.updateName);
    router.delete("/:id", roles.delete);

    app.use('/api/roles', router);
};
