// create a simple app that will restart and 
// reload the entire server when a push event happesn

const pm2 = require(`pm2`);
const express = require(`express`);
const app = express();
const crypto = require(`crypto`);
const hash = crypto.createHash(`sha256`);
const https = require(`https`);
const fs = require(`fs`);

require(`dotenv`).config({ path: __dirname + `/.env` });

const certInfos = {
  key: fs.readFileSync(process.env.KEY || __dirname + `/local/key.pem`),
  cert: fs.readFileSync(process.env.CERT || __dirname + `/local/cert.pem`),
};

function generateDigest(string) {
  hash.update(string);
  console.log(hash);
  console.log(hash.digest(`sha256`));
}

function verifySignature() {
  if (crypto.timingSafeEqual())
    return true;
  return false;
}

app.post(`/restart-web-server`, (req, res) => {
  console.log(req);
  console.log(req.headers[`X-Hub-Signature-256`]);
  res.status(200).json({ message: `OK` });
});

const PORT = process.env.PORT || 8001;

const httpsServer = https.createServer(certInfos, app);

httpsServer.listen(PORT, () => {
  console.log(`github listener is running on port ${PORT}`);
});