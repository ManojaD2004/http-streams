const express = require("express");
const cors = require("cors");

const PORT = 4000;

const app = express();
app.use(cors());

app.get("/hello", (req, res) => {
  res.send({ data: "Hello Tiger", status: "success" });
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
