const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });

const http = require("http");
const https = require("https");

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

let certInfos = {};
if (!process.env.NO_HTTPS) {
  console.log("key, cert files will not be loaded");
  certInfos = {
    key: fs.readFileSync(process.env.KEY || __dirname + "/local/key.pem"),
    cert: fs.readFileSync(process.env.CERT || __dirname + "/local/cert.pem")
  };
}
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

let httpRerouteApp = express();
if (!process.env.NO_HTTPS) {
  console.log("disabling https redirect");
  httpRerouteApp.get("*", (req, res) => {
    res.redirect("https://" + req.headers.host + req.url);
  });
}

var httpServer = http.createServer(httpRerouteApp);
var httpsServer = https.createServer(certInfos, app);

app.use(express.static("html"));
// fall back page
app.use((req, res) => {
  res.render("test");
});

console.log(`http port: ${process.env.HTTP_PORT || 80}\nhttps port: ${process.env.HTTPS_PORT || 443}`);
console.log(`click here to connect http://${process.env.HOST || "localhost"}:${process.env.HTTP_PORT}`);
httpServer.listen(process.env.HTTP_PORT || 80);
httpsServer.listen(process.env.HTTPS_PORT || 443);
