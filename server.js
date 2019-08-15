require("dotenv").config();
const express = require("express"); // call express
const bodyParser = require("body-parser"); // use bodyParser
const app = express(); // define our app using express
const port = 3005;
const connect = require("./connect");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello");
});

app.get("/callback", function(req, res) {
  const query = {
    name: "now",
    text: "SELECT NOW()"
  };
  connect.query(query, function(resp) {
    if (resp.error) {
      console.error(resp.error);
      return res.status(500).end();
    }
    res.json(resp.result.rows);
  });
});

app.get("/promise", function(req, res) {
  const query = {
    name: "now",
    text: "SELECT NOW()"
  };
  connect
    .queryWithPromise(query)
    .then(resp => {
      res.json(resp.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

app.get("/await", async function(req, res) {
  const query = {
    name: "now",
    text: "SELECT NOW()"
  };
  try {
    const data = await connect.queryWithAwait(query);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.listen(port, () => console.log("node started on port ", port));
