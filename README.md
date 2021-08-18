<div align="center">
<h1>Stem Discord Website</h1>
<p>Branch is pretty stable. Just install the dependencies and everything should work fine. Make sure that you have Vue CLU installed!</p>
<p><a href="https://github.com/stem-discord/website/issues/new">[Create Issues]</a> - <a href="https://github.com/stem-discord/website/issues">[View Issues]</a> - <a href="https://stem.help">[View Site]</a></p>
</div>

## Quick Start & Frontend Help
If you dont have a key and cert, set `NO_HTTPS` on your `.env` file to true. Do `npm run serve` and vue cli will launch a front end hot reload server. It's pretty much out of the box.  If you want to do some fancy stuff, read further.

## I'm bored... what do I do?
[todo.md](https://github.com/stem-discord/website/blob/main/todo.md) or ctrl+f -> all documents -> "TODO" and "FIXME"

## General Information
This project uses Node `v15.5.0`. All other module dependencies only work with `v15`. If the project isn't working try deleting `node_modules` and abusing NPM! This project uses [Express](https://expressjs.com/) as a backend. If you want to run the server *WITH* the backend, run `npm run express`. Also make sure to run `npm run build` so that Vue builds files to `./dist`.

[Install Node v1.15.5](https://nodejs.org/download/release/v15.5.0/) - [Node v1.15.5 Docs](https://nodejs.org/dist/v15.5.0/docs/api/)

this project uses express as backend. if you want to run this server WITH the backend, `do npm run express`  
make sure to run `npm run build` so vue can build files to `./dist/`

## Database
This project uses a MongoDB database, confuguration information is not provided so use the [the Docs](https://docs.mongodb.com/) if you need help setting up MongoDB.

> Ensure the `mongodb_uri` contains auth info!

# Configuring Templates
`/srv`
```env
# these are optional
HTTP_PORT=80
HTTPS_PORT=443
HOST_BASE=http://localhost:3000
COOKIE_SECRET=secret key. not required for dev server
DISCORD_CLIENT_SECRET=the discord application token
DISCORD_CLIENT_ID=the id
MONGODB_URI=mongodb uri. required. add auth info here
MONGODB_URI_AUTH=mongodb://admin:YOURPASSWORDHERELOL@127.0.0.1:27017
DB_USER=admin user account (usually admin)
DB_PASS=the password
DB_AUTHSOURCE=the database to validate (usually admin)
PROCESS_NAME=used for pm2 restart on github. required if you want to test github push actions
STEM_DISCORD_DB=the database for stem discord. not required# mongodb://localhost:27018
```

`srv/discordBot`
```env
DISCORD_BOT_TOKEN=the discord BOT token
DB_CHANNEL=channel id where media gets uploaded
```

## Resetting your environment
In the event that you need to reset your environment, use `npm run relaunch` to automatically reset your environment and run a fresh server! 

## Setting Up Vue
1. Install Dependencies
```
npm install
```
2. Compile and hot-reloads for development
```
npm run serve
```
3. Compile and minify for production
```
npm run build
```
4. Run your unit tests
```
npm run test:unit
```
5. Fix Lints and files
```
npm run lint
```
6. Customize configuration
(See [Configuration Reference](https://cli.vuejs.org/config/))

----------------------
**If you have any concerns of bugs, either [Crete An Issue](https://github.com/stem-discord/website/issues) describing your problem or [Create A Pull Request](https://github.com/stem-discord/website/pulls) solving your problem!**
