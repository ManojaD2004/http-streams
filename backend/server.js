const express = require("express");
const cors = require("cors");

const PORT = 4000;

const app = express();
app.use(cors());

app.get("/hello", (_, res) => {
  res.send({ data: "Hello Tiger", status: "success" });
});

app.get("/event", (req, res) => {
  try {
    // Headers are essentials metadata to tell how the connection should behave.
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let i = 0;
    const interval = setInterval(() => {
      console.log("Sending!", i++);
      res.write(
        `event: myEvent\ndata: ${JSON.stringify({
          message: "Hello from server " + i,
          timestamp: new Date(),
        })}\n\n`
      );
    }, 1000);

    req.on("close", () => {
      console.log("Connectino Ended!");
      clearInterval(interval);
      res.end();
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
