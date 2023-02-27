const express = require("express");
const axios = require("axios");
const CircularJSON = require("circular-json");
const connectDB = require("./db/db");
const Coin = require("./model/coinSchema");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
dotenv.config();
connectDB();

app.use(express.static(path.join(__dirname + "/static")));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const data = await Coin.find();
  res.render("index", { data });
});

app.get("/add-data", async (req, res) => {
  let data = await axios.get("https://api.wazirx.com/api/v2/tickers");
  data = CircularJSON.stringify(data);
  data = JSON.parse(data);
  let keys = Object.keys(data.data);
  let finalData = [];
  for (let i = 0; i < 10; i++) {
    let obj = new Coin({
      name: data.data[keys[i]]["name"],
      last: data.data[keys[i]]["last"],
      buy: data.data[keys[i]]["buy"],
      sell: data.data[keys[i]]["sell"],
      volume: data.data[keys[i]]["volume"],
      base_unit: data.data[keys[i]]["base_unit"],
    });
    finalData.push(obj);
  }
  const createdData = await Coin.create(finalData);

  res.json(createdData);
});

app.listen(5000, () => console.log(`server started on port ${5000}`));
