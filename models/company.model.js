const sql = require("./db.js");

// Empresa constructor
const Company = function(company) {
    this.name = company.name;
    this.address = company.address;
};

// Criar uma nova empresa
Company.create = (newCompany, result) => {
    sql.query("INSERT INTO companies SET ?", newCompany, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newCompany });
    });
};

// Obter todas as empresas
Company.getAll = (result) => {
    sql.query("SELECT * FROM companies", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obter uma empresa pelo ID
Company.getById = (id, result) => {
    sql.query("SELECT * FROM companies WHERE id = ?", id, (err, res) => {
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

// Atualizar uma empresa
Company.updateById = (id, company, result) => {
    sql.query(
        "UPDATE companies SET name = ?, address = ? WHERE id = ?",
        [company.name, company.address, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...company });
        }
    );
};

// Remover uma empresa
Company.remove = (id, result) => {
    sql.query("DELETE FROM companies WHERE id = ?", id, (err, res) => {
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

module.exports = Company;
