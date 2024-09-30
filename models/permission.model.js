const sql = require("./db.js");

// Permission constructor
const Permission = function(permission) {
    this.name = permission.name; // Nome da permissão
};

// Criar uma nova permissão
Permission.create = (newPermission, result) => {
    sql.query("INSERT INTO permissions SET ?", newPermission, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newPermission });
    });
};

// Listar todas as permissões
Permission.getAll = (result) => {
    sql.query("SELECT * FROM permissions", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obter uma permissão específica pelo ID
Permission.getById = (id, result) => {
    sql.query("SELECT * FROM permissions WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};

// Atualizar todos os dados de uma permissão
Permission.updateById = (id, permission, result) => {
    sql.query(
        "UPDATE permissions SET name = ? WHERE id = ?",
        [permission.name, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...permission });
        }
    );
};

// Atualizar o nome de uma permissão específica
Permission.updateName = (id, name, result) => {
    sql.query(
        "UPDATE permissions SET name = ? WHERE id = ?",
        [name, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, name: name });
        }
    );
};

// Remover uma permissão específica
Permission.remove = (id, result) => {
    sql.query("DELETE FROM permissions WHERE id = ?", id, (err, res) => {
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

module.exports = Permission;
