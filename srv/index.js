import express from "express";
// import socketIO from "socket.io";


module.exports = (app) => {
  // api
  app.use(express.json());
  app.get(`/api`, (req, res) => {
    res.json({msg: `works`});
  });

  // vue view
  app.use(require(`connect-history-api-fallback`)());

  // // vue output
  // app.set(`views`, `dist`);
  // app.set(`view engine`, `html`);
  
  // TODO: i was originally going to use views instead of static but for some reason i cant get views to work and the below works just fine idk maybe ill fix it when im better at express or smth
  app.use(express.static(`dist`));

  
  // app.post('/bar', (req, res) => {
  //   res.json(req.body);
  // });
  //
  // optional support for socket.io
  //
  // let io = socketIO(http);
  // io.on("connection", client => {
  //   client.on("message", function(data) {
  //     // do something
  //   });
  //   client.emit("message", "Welcome");
  // });
};
