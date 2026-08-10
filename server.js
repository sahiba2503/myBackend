const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("frontend"));

app.post("/task", (req, res) => {

    const task = req.body;

    console.log(task);

    res.json(task);
});

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});