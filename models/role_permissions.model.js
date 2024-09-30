const sql = require("./db.js");

// RolePermission constructor
const RolePermission = function(rolePermission) {
    this.roleId = rolePermission.roleId;
    this.permissionId = rolePermission.permissionId;
};

// Associar uma permissão a um papel
RolePermission.create = (newRolePermission, result) => {
    sql.query("INSERT INTO role_permissions SET ?", newRolePermission, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newRolePermission });
    });
};

// Listar todas as associações de papéis e permissões
RolePermission.getAll = (result) => {
    sql.query("SELECT * FROM role_permissions", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Remover uma associação de papel e permissão
RolePermission.remove = (roleId, permissionId, result) => {
    sql.query("DELETE FROM role_permissions WHERE roleId = ? AND permissionId = ?", [roleId, permissionId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

module.exports = RolePermission;
