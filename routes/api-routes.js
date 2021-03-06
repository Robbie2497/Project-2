// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const axios = require("axios");
require("dotenv").config();

module.exports = function(app) {
  app.get("/", (req, res) => {
    db.Movie.findall({}).then(dbMovie => {
      res.render("index", dbMovie);
    });
  });
  app.get("/api/omdb/:title", async (req, res) => {
    const title = req.params.title;
    const queryURL = `https://www.omdbapi.com/?t=${title}&apikey=${process.env.MOVIE_API_KEY}`;
    await axios.get(queryURL).then(data => {
      res.json(data.data);
    });
  });
  app.get("/api/movies", (req, res) => {
    db.Movie.findall({}).then(dbMovie => {
      res.json(dbMovie);
    });
  });
  app.get("/api/movies/:id", (req, res) => {
    db.Movie.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbMovie => {
      res.json(dbMovie);
    });
  });
  app.put("/api/movies/:id", (req, res) => {
    db.Movie.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(dbMovie => {
      res.json(dbMovie);
    });
  });
  app.post("/api/movies", (req, res) => {
    db.Movie.create(req.body).then(dbMovie => {
      res.json(dbMovie);
    });
  });
  app.delete("/api/movies/:id", (req, res) => {
    db.Movie.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbMovie => {
      res.json(dbMovie);
    });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
