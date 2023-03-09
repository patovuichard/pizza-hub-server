const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/auth.middlewares.js");

// POST "/api/auth/signup" --> Registro al user en la DB
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username, password);

  // 1. Validacaciones de BackEnd
  // Validar que los campos no esten vacios
  if (!username || !password) {
    res.status(400).json({ errorMessage: "Los campos no deben estar vacios" });
    return;
  }
  // Validar que la contraseña sea lo suficientemente fuerte

  try {
    // Encripto la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);
    // Crear el documento en la DB
    await User.create({
      username: username,
      password: hashPassword,
    });
    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" --> Validar las credenciales del user
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  // console.log(username, password)
  if (!username || !password) {
    res.status(400).json({ errorMessage: "Los campos no deben estar vacios" });
    return;
  }
  try {
    // Verificar que el user exista en la DB
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Credenciales no validas" });
    }
    // Validar si el password es el correcto
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Credenciales no validas" });
    }
    // Credenciales ya validadas del user
    // Aqui vendria el sistema de sesiones

    // Payload es el contenido del Token que indentifica al user
    const payload = {
      _id: foundUser._id,
      username: foundUser.username,
      // si tuviesenmos roles, podrian ir en payload
    };
    // Generamos el Token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d", // 7 dias
    });

    res.status(201).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" --> Verificar si el user esta activo
router.get("/verify", isAuthenticated, (req, res, next) => {
  // Esta ruta pasara por un middleware para verificar la validez del Token

  // EN EL BACK END VAMOS A TENER UNA FORMA DE SABER QUIEN ES EL USUARIO ACTIVO
  // ESTO SERA SIMILAR AL REQ.SESSION.ACTIVEUSER
  // EN ESTA ESTRUCTURA SE LLAMA AL req.payload
  console.log(req.payload);

  // Si llego a este punto, no tengo problemas
  res.status(200).json(req.payload);
});

module.exports = router;
