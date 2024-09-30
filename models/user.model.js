const sql = require("./db.js");

// User constructor
const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password; // Não armazene senhas em texto simples em produção
    this.role = user.role;
};

// Criar um novo usuário
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUser });
    });
};

// Listar todos os usuários
User.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obter um usuário específico pelo ID
User.getById = (id, result) => {
    sql.query("SELECT * FROM users WHERE id = ?", id, (err, res) => {
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

// Atualizar todos os dados de um usuário
User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
        [user.name, user.email, user.role, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...user });
        }
    );
};

// Atualizar a senha de um usuário
User.updatePassword = (id, password, result) => {
    sql.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [password, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id });
        }
    );
};

// Atualizar o email de um usuário
User.updateEmail = (id, email, result) => {
    sql.query(
        "UPDATE users SET email = ? WHERE id = ?",
        [email, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id });
        }
    );
};

// Remover um usuário
User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

module.exports = User;
