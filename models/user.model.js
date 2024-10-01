const sql = require("./db.js");

// User constructor
const User = function(user) {
    this.name = user.name;
    this.username = user.username;  // Added username field
    this.email = user.email;
    this.password = user.password; // Do not store passwords in plain text in production
    this.role_id = user.role_id;  // Updated to role_id
    this.profile_pic = user.profile_pic;  // Added profile_pic field
};

// Create a new user
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUser });
    });
};

// List all users
User.getAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// Get a specific user by ID
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

// Update all user data
User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET name = ?, username = ?, email = ?, role_id = ?, profile_pic = ? WHERE id = ?",
        [user.name, user.username, user.email, user.role_id, user.profile_pic, id],
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

// Update a user's password
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

// Update a user's email
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

// Remove a user
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
