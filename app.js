const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Inicializa o aplicativo Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurações do JWT
const SECRET_KEY = "sua_chave_secreta"; // Mantenha isso em um local seguro
const TOKEN_EXPIRATION = "1h"; // Define a expiração do token

// Importar rotas
const userRoutes = require("./routes/user.routes.js");
const companyRoutes = require("./routes/company.routes.js");
const companyServiceRoutes = require("./routes/company_services.routes.js");
const permissionRoutes = require("./routes/permission.routes.js");
const roleRoutes = require("./routes/roles.routes.js");
const rolePermissionRoutes = require("./routes/role_permissions.routes.js");
const serviceRoutes = require("./routes/service.routes.js");
const userCompanyRoutes = require("./routes/user_company.routes.js");

// Usar as rotas
app.use("/api/users", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/company_services", companyServiceRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/role_permissions", rolePermissionRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/user_company", userCompanyRoutes);

// Rota básica
app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo à API!" });
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}.`);
});
