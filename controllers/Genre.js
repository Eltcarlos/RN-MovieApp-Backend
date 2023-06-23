const Genre = require("../models/mongoose/Genre");

const createGenre = async (req, res) => {
  const { name } = req.body;
  try {
    const genre = new Genre({ name });
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el género." });
  }
};

// Exportar los métodos del controlador
module.exports = {
  createGenre,
};
