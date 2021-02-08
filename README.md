# Branch is pretty stable. Just do npm install and everything should work pretty fine. **Make sure you have vue cli installed**

# quick start and help with front end

if you dont have key and cert, go to `vue.config.js` and set https to false.  
do `npm run serve` and vue cli will launch a front end hot reload server. its pretty much out of the box.  
if you want to do some fancy stuff, read below

# im bored what do i do?

ctrl+f -> all documents -> "TODO" and "FIXME"

# node

uses `v15.5.0`. all other module dependencies only work with `v15`. if you project doesn't work just delete `node_modules` and abuse npm

# express

this project uses express as backend. if you want to run this server WITH the backend, `do npm run express`  
make sure to run `npm run build` so vue can build files to `./dist/`

# website

[stem.help](https://stem.help)

# database

Good news, we actually use a mongodb. bad news, good luck configuring it because im not going to put a whole tutorial on how to set up a mongodb

f*king mustarded mongo f\*kin db wont evevn ducking show the mustarded stupid shit where the mongoose doesnt even frikin allow the connection option of pass and user aso you have to cencodiaifna;fioasjhfoidnf;oaisdfnasdo;inf;edosiaunf;oas

> make sure the mongodb_uri contains auth info

# configuring
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
MONGODB_URI_AUTH=mongodb://admin:0x205e048ae0632cee0x205e048ae0632cee0x205e048ae0632cee@127.0.0.1:27017
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

# pm2
`npm run relaunch` 
will automatically reset your environment and run a fresh server

# vue setup

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
