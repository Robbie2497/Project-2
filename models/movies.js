module.exports = function(sequelize, DataTypes) {
  const Movie = sequelize.define("Movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    reason: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    year: {
      type: DataTypes.STRING
    }
  });
  return Movie;
};

//movies belongs to user
