const express = require("express");
const mongoDB = require("mongoose");
const routes = require("./routes/auth");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.listen(3000, () => {
    console.log("server runing on 3000");
});

(async() => {
    await mongoDB.connect(
        process.env.dbURL, { useUnifiedTopology: true, useNewUrlParser: true },
        () => console.log("connected to db")
    );
})();

app.use(express.json());

app.use("/api/user", routes);