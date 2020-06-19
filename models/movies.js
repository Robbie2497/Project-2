// Export sequilize function
module.exports = function(sequelize, DataTypes) {
  //Create Movie Table
  const Movie = sequelize.define("Movie", {
    //title For The Movie
    //Data Type: String
    //Limitations: Can't be null, must have at least one character
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //favourite Open For Future Dev
    //Data Type: Boolean
    //Limitations: default is false
    favorite: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    //reason for save reason
    //Data Type: String
    //Limitations: None
    reason: {
      type: DataTypes.STRING
    },
    //Rating For Movie Rating
    //Data Type: Integer
    //Limitations: None
    rating: {
      type: DataTypes.INTEGER
    },
    //Year that movie was released
    //Data Type: String
    //Limitations: None
    year: {
      type: DataTypes.STRING
    }
  });
  //movies belongs to user
  Movie.associate = function(models) {
    Movie.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Movie;
};
