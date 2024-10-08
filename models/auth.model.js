const db = require('./db'); // Import the database connection

// Find a user by email
exports.findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length > 0) {
            callback(null, results[0]);
        } else {
            callback(null, null);
        }
    });
};

// Create a new user
exports.createUser = (email, hashedPassword, roleId, callback) => {
    const query = 'INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)';
    db.query(query, [email, hashedPassword, roleId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Update user password
exports.updateUserPassword = (userId, hashedPassword, result) => {
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(query, [hashedPassword, userId], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, { message: 'Password updated successfully' });
    });
};
