module.exports = (app) => {
    const companyServices = require("../controllers/company_services.controller.js");
    const router = require("express").Router();

    router.post("/", companyServices.create);
    router.get("/", companyServices.findAll);
    router.get("/:id", companyServices.findById);
    router.put("/:id", companyServices.update);
    router.put("/:id/enabled", companyServices.toggleStatus);
    router.put("/:id/subscription", companyServices.updateSubscription);
    router.delete("/:id", companyServices.delete);

    app.use('/api/company_services', router);
};
