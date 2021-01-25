const express = require("express");
const fs = require("fs");
require("dotenv").config({ path: __dirname + "/.env" });

const http = require("http");
let certinfos;
if (!process.env.NO_HTTPS) {
  const https = require("https");
   certInfos = {
    key: fs.readFileSync(process.env.KEY || __dirname + "/local/key.pem"),
    cert: fs.readFileSync(process.env.CERT || __dirname + "/local/cert.pem")
  };
  console.log("key, cert files loaded");
} else {
  console.log("running on http");
  
}

const path = require("path");
const morgan = require("morgan");

const app = express();
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.set("views", `${__dirname}/html/`);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(
  express.urlencoded({
    extended: true
  })
);



app.use(express.static("html"));
// fall back page
app.use((req, res) => {
  res.render("test");
});

// if http mode, make this the main server
let httpServer;
if (!process.env.NO_HTTPS) {
  let httpRerouteApp = express();
  httpServer = http.createServer(httpRerouteApp);
  httpRerouteApp.get("*", (req, res) => {
    res.redirect("https://" + req.headers.host + req.url);
  });
} else {
  httpServer = http.createServer(app);
}

console.log(`http port: ${process.env.HTTP_PORT || 80}`);
if (!process.env.NO_HTTPS) console.log(`https port: ${process.env.HTTPS_PORT || 443}`);
console.log(`click here to connect http://${process.env.HOST || "localhost"}:${process.env.HTTP_PORT || 80}`);

httpServer.listen(process.env.HTTP_PORT || 80);

if (!process.env.NO_HTTPS) {
  let httpsServer = https.createServer(certInfos, app);
  httpsServer.listen(process.env.HTTPS_PORT || 443);
} else {
  console.log("https redirect disabled");
}
