const express = require("express");
const session = require('express-session');
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Initialize the Express app
const app = express();

app.use(express.json()); // Middleware for parsing JSON requests

app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT Configurations
const SECRET_KEY = "your_secret_key"; // Keep this secure

// Import routes
const userRoutes = require("./routes/user.routes.js");
const companyRoutes = require("./routes/company.routes.js");
const companyServiceRoutes = require("./routes/company_services.routes.js");
const permissionRoutes = require("./routes/permission.routes.js");
const roleRoutes = require("./routes/roles.routes.js");
const rolePermissionRoutes = require("./routes/role_permissions.routes.js");
const serviceRoutes = require("./routes/service.routes.js");
const userCompanyRoutes = require("./routes/user_company.routes.js");
const authRoutes = require("./routes/auth.routes.js"); // Include auth routes

// Use routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/company_services", companyServiceRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/role_permissions", rolePermissionRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/user_company", userCompanyRoutes);

// Basic route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
