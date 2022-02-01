const db = require("../models");
const Apunte = db.apuntes;
const Op = db.Sequelize.Op;

/** Create and save a new Apunte */
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //Create a Apunte
  const apunte = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  //Save Apunte in the database
  Apunte.create(apunte)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the apunte",
      });
    });
};

/** Retrieve all Apuntes from the database */
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Apunte.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving apuntes.",
      });
    });
};

/** Find a single Apunte with an id */
exports.findOne = (req, res) => {
  const id = req.params.id;

  Apunte.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Apunte with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Apunte with id" + id,
      });
    });
};

/** Update a Apunte by the id in the request */
exports.update = (req, res) => {
  const id = req.params.id;

  Apunte.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Apunte was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Apunte with id=${id}. Maybe Apunte was not found or req.body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Apunte with id=" + id,
      });
    });
};

/** Delete a Apunte with the specified id in the request */
exports.delete = (req, res) => {
  const id = req.params.id;

  Apunte.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Apunte was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Apunte with id=${id}. Maybe Apunte was not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Apunte with id=" + id,
      });
    });
};

/** Delete all Apuntes from the database */
exports.deleteAll = (req, res) => {
  Apunte.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Apuntes were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while removing all apuntes.",
      });
    });
};

/** Find all published Apuntes */
exports.findAllPublished = (req, res) => {
  Apunte.findAll({
    where: { published: true },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving apuntes.",
      });
    });
};
