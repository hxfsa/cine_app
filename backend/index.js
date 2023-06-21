require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5050;

connection.connect((err) => {
  if (err) {
    ("Oups, tu n'es pas connectée");
  } else {
    console.log("connexion établie");
  }
});

app.get("/movies", (req, res) => {
  const SQL = "SELECT * FROM movie";
  connection
    .promise()
    .query(SQL)
    .then((movies) => {
      res.json(movies[0]);
    })
    .catch();
});

app.use(express.json());
app.post("/movies", (req, res) => {
  const movie = req.body;
  const SQL =
    "INSERT INTO movie (movie_database_id, title, date, note, overview, image) VALUES (?, ?, ?, ?, ?, ?)";
  const { movie_database_id, title, date, note, overview, image } = movie;
  connection
    .promise()
    .query(SQL, [movie_database_id, title, date, note, overview, image])
    .then((result) => {
      console.log(result)
      const SQL = "SELECT * FROM movie ORDER BY id DESC LIMIT 1";
      connection
        .promise()
        .query(SQL)
        .then((result) => {
          res.status(201).json({
            message: "film ajouté",
            movie: result[0][0],
          });
        });
    });
});

app.get("/movies/:id", (req, res) => {
    const id = req.params.id;
    const SQL = "SELECT * FROM movie WHERE id = ?";
    connection
      .promise()
      .query(SQL, [id])
      .then((movie) => {
        res.json(movie[0][0]);
      })
      .catch();
  });

  app.delete("/movies/:id", (req, res) => {
    const id = req.params.id;
    const SQL = "DELETE FROM movie WHERE id = ?";
    connection
      .promise()
      .query(SQL, [id])
      .then((result) => {
        res.json({
            message:"movie deleted"
        });
      })
      .catch();
  });

/* EXPRESS */
app.listen(PORT, (err) => {
  if (err) {
    console.error("Oups, une erreur s'est produite");
  } else {
    console.log(`L'application tourne sur le port : ${PORT}`);
  }
});
