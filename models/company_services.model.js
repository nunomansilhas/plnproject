const sql = require("./db.js");

// CompanyService constructor
const CompanyService = function(companyService) {
    this.companyId = companyService.companyId; // ID da empresa
    this.serviceId = companyService.serviceId; // ID do serviço
    this.subscriptionEnd = companyService.subscriptionEnd; // Data de término da assinatura
    this.status = companyService.status; // Status do serviço
};

// Adicionar um serviço para uma empresa
CompanyService.create = (newCompanyService, result) => {
    sql.query("INSERT INTO company_services SET ?", newCompanyService, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newCompanyService });
    });
};

// Listar todos os serviços de todas as empresas
CompanyService.getAll = (result) => {
    sql.query("SELECT * FROM company_services", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obter um serviço específico pelo ID
CompanyService.getById = (id, result) => {
    sql.query("SELECT * FROM company_services WHERE id = ?", id, (err, res) => {
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

// Atualizar todos os dados de um serviço
CompanyService.updateById = (id, companyService, result) => {
    sql.query(
        "UPDATE company_services SET companyId = ?, serviceId = ?, subscriptionEnd = ?, status = ? WHERE id = ?",
        [companyService.companyId, companyService.serviceId, companyService.subscriptionEnd, companyService.status, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...companyService });
        }
    );
};

// Ativar ou desativar um serviço específico
CompanyService.toggleStatus = (id, result) => {
    sql.query("UPDATE company_services SET status = NOT status WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: id });
    });
};

// Atualizar dados de assinatura de um serviço
CompanyService.updateSubscription = (id, subscriptionEnd, result) => {
    sql.query(
        "UPDATE company_services SET subscriptionEnd = ? WHERE id = ?",
        [subscriptionEnd, id],
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

// Remover um serviço específico
CompanyService.remove = (id, result) => {
    sql.query("DELETE FROM company_services WHERE id = ?", id, (err, res) => {
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

module.exports = CompanyService;
