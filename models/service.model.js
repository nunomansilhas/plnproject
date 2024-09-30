const sql = require("./db.js");

// Service constructor
const Service = function(service) {
    this.name = service.name;
    this.description = service.description;
    this.status = service.status; // Assuming there is a status field
};

// Criar um novo serviço
Service.create = (newService, result) => {
    sql.query("INSERT INTO services SET ?", newService, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newService });
    });
};

// Listar todos os serviços
Service.getAll = (result) => {
    sql.query("SELECT * FROM services", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Obter um serviço específico pelo ID
Service.getById = (id, result) => {
    sql.query("SELECT * FROM services WHERE id = ?", id, (err, res) => {
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
Service.updateById = (id, service, result) => {
    sql.query(
        "UPDATE services SET name = ?, description = ?, status = ? WHERE id = ?",
        [service.name, service.description, service.status, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...service });
        }
    );
};

// Atualizar apenas o nome de um serviço
Service.updateNameById = (id, name, result) => {
    sql.query("UPDATE services SET name = ? WHERE id = ?", [name, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: id, name: name });
    });
};

// Atualizar apenas a descrição de um serviço
Service.updateDescriptionById = (id, description, result) => {
    sql.query("UPDATE services SET description = ? WHERE id = ?", [description, id], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: id, description: description });
    });
};

// Remover um serviço
Service.remove = (id, result) => {
    sql.query("DELETE FROM services WHERE id = ?", id, (err, res) => {
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

module.exports = Service;
