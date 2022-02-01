module.exports = (app) => {
  const apuntes = require("../controllers/apunte.controller");

  let router = require("express").Router();

  // Create a new apunte
  router.post("/", apuntes.create);

  // Retrieve all apuntes
  router.get("/", apuntes.findAll);

  // Retrieve all published Apuntes
  router.get("/published", apuntes.findAllPublished);

  // Retrieve a single apunte with id
  router.get("/:id", apuntes.findOne);

  // Update a apunte with id
  router.put("/:id", apuntes.update);

  // Delete a Apunte with id
  router.delete("/:id", apuntes.delete);

  // Delete all apuntes
  router.delete("/", apuntes.deleteAll);

  app.use("/api/apuntes", router);
};
