
import express from "express";
// const express = require("express");
const app = express();

app.post("/data", (req, res) => {
    res.send("data received");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});