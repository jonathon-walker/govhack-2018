import * as express from "express";

export const app = express();

app.get("/", (req, res) => res.send("Govhack 2018"));
