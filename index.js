const express = require("express");
const mongoDB = require("mongoose");
const routes = require("./routes/auth");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

try {
    (async() => {
        await mongoDB.connect(
            process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true },
            () => console.log("connected to db")
        );
    })();
} catch (err) {
    console.log(err);
}

app.listen(3000, () => {
    console.log("server runing on 3000");
});

app.use(express.json());

app.use("/api/user", routes);