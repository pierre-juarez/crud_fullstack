module.exports = (sequelize, Sequelize) => {
  const Apunte = sequelize.define("apunte", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Apunte;
};
