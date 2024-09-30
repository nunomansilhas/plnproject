const sql = require("./db.js");

// UserCompany constructor
const UserCompany = function(userCompany) {
    this.userId = userCompany.userId;
    this.companyId = userCompany.companyId;
};

// Associar um usuário a uma empresa
UserCompany.create = (newUserCompany, result) => {
    sql.query("INSERT INTO user_company SET ?", newUserCompany, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUserCompany });
    });
};

// Listar todas as associações de usuários e empresas
UserCompany.getAll = (result) => {
    sql.query("SELECT * FROM user_company", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Remover a associação de um usuário a uma empresa
UserCompany.remove = (userId, companyId, result) => {
    sql.query("DELETE FROM user_company WHERE userId = ? AND companyId = ?", [userId, companyId], (err, res) => {
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

module.exports = UserCompany;
