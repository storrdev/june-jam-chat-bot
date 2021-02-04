require("dotenv").config();

const WebSocket = require("ws");
const tmi = require("tmi.js");

const wss = new WebSocket.Server({ port: 6969 });

let ws;

wss.on("connection", function connection(_ws) {
  _ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  _ws.send("something");

  ws = _ws;
});

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: "storr20",
    password: process.env.TMI_PASSWORD,
  },
  channels: ["storr20"],
});

client.connect().catch(console.error);

let lastCall = 0;

client.on("message", (channel, tags, message, self) => {
  if (ws) {
    if (message.toLowerCase() === "!jerry") {
      if (Date.now() > lastCall + 30000) {
        ws.send("jerry");
        lastCall = Date.now();
      }
    }
  }
});
