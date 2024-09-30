const RolePermission = require("../models/role_permissions.model.js");

// Associar uma permissão a um papel (POST /role_permissions)
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }

    const rolePermission = new RolePermission({
        roleId: req.body.roleId,
        permissionId: req.body.permissionId,
    });

    RolePermission.create(rolePermission, (err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Listar todas as associações de papéis e permissões (GET /role_permissions)
exports.findAll = (req, res) => {
    RolePermission.getAll((err, data) => {
        if (err) res.status(500).send({ message: err.message });
        else res.send(data);
    });
};

// Remover uma associação de papel e permissão (DELETE /role_permissions/:roleId/:permissionId)
exports.delete = (req, res) => {
    RolePermission.remove(req.params.roleId, req.params.permissionId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({ message: `Association not found for roleId ${req.params.roleId} and permissionId ${req.params.permissionId}` });
            } else {
                res.status(500).send({ message: "Could not delete association for roleId " + req.params.roleId + " and permissionId " + req.params.permissionId });
            }
        } else res.send({ message: `Association was deleted successfully!` });
    });
};
