const express = require("express");
const cors = require("cors");

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send({ data: "Hello Tiger", status: "success" });
});

// SSE
app.get("/event", (req, res) => {
  try {
    // Headers are essentials metadata to tell how the connection should behave.
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let i = 0;
    const interval = setInterval(() => {
      if (i === 10) {
        res.end();
        clearInterval(interval);
        return;
      }
      console.log("Sending!", i++);
      res.write(
        `event: myEvent\ndata: ${JSON.stringify({
          message: "Hello from server " + i,
          timestamp: new Date(),
        })}\n\n`
      );
    }, 1000);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Response Streams
app.post("/event", (req, res) => {
  try {
    // Headers are essentials metadata to tell how the connection should behave.
    const { userName } = req.body;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let i = 0;
    const interval = setInterval(() => {
      if (i === 10) {
        res.end();
        clearInterval(interval);
        return;
      }
      console.log("Sending!", i++);
      res.write(
        `${JSON.stringify({
          message: `Hello ${userName} from server Response stream` + i,
          timestamp: new Date(),
        })}`
      );
    }, 1000);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post("/send/stream", (req, res) => {
  try {
    // Headers are essentials metadata to tell how the connection should behave.
    // res.setHeader("Content-Type", "application/json");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    let finalData = "";
    let count = 0;
    req.on("data", (data) => {
      console.log(`Received ${count++}`);
    });
    req.on("close", () => {
      console.log("Close");
      res.send(`Blob received! ${count}`);
    });
    req.on("end", () => {
      console.log("End");
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
