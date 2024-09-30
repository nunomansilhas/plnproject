const sql = require("./db.js");

// Role constructor
const Role = function(role) {
    this.name = role.name; // Nome do papel
};

// Criar um novo papel
Role.create = (newRole, result) => {
    sql.query("INSERT INTO roles SET ?", newRole, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newRole });
    });
};

// Listar todos os papéis
Role.getAll = (result) => {
    sql.query("SELECT * FROM roles", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obter um papel específico pelo ID
Role.getById = (id, result) => {
    sql.query("SELECT * FROM roles WHERE id = ?", id, (err, res) => {
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

// Atualizar todos os dados de um papel
Role.updateById = (id, role, result) => {
    sql.query(
        "UPDATE roles SET name = ? WHERE id = ?",
        [role.name, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...role });
        }
    );
};

// Atualizar o nome de um papel específico
Role.updateName = (id, name, result) => {
    sql.query(
        "UPDATE roles SET name = ? WHERE id = ?",
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

// Remover um papel específico
Role.remove = (id, result) => {
    sql.query("DELETE FROM roles WHERE id = ?", id, (err, res) => {
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

module.exports = Role;
