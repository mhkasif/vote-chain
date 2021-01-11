const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

const db=mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("db connected"))
  .catch((error) => console.log("error while connecting db"));

app.listen(process.env.PORT || 8800, () => {
  console.log("server is running");
});

