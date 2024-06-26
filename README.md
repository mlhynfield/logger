<center><img src="https://cdn.discordapp.com/attachments/349356606883889152/616414555639382016/Logger.png" />
<a href="https://discordbots.org/bot/298822483060981760" >
  <img src="https://discordbots.org/api/widget/298822483060981760.svg" alt="Logger" />
</a>
</center>

## Logger's official instance closed 04/05/2024, but can still be selfhosted and modified by users. 

Logger is a powerful [Discord](https://discordapp.com) bot meant to give staff members oversight over the various actions taking place in their server. Come talk about it in the server [Logger's Lounge](https://discord.gg/ed7Gaa3).

## Installation via Docker
This route uses Docker and a docker-compose file to bring up the required dependencies for Logger.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) if on Windows, and [regular Docker on Linux systems](https://docs.docker.com/engine/install/ubuntu/)
2. Download the bot code via `git clone https://github.com/curtisf/logger` or clicking "<> Code -> Download Zip" on the GitHub page
3. In the bot code folder, copy/rename .env.example into .env
4. Fill out **all** values in your .env file
5. Run `docker compose up` to start the bot and dependent services. This will make two folders in the same folder that the command is ran in: pgdata and redisdata, used for storing database information. If you want to change the location that postgres and redis data is stored, check out the volume mounts in `docker-compose.yml`.
6. The bot should be up and running in Discord if all values are present. The database tables will be initialized upon the bot starting, or you can initialize them using `node src/miscellaneous/generateDB.js`.
7. If you have issues, check the logs for `docker compose up`. Otherwise, you're done, and can use `docker compose up -d` to run the bot in the background 24/7
8. To setup slash commands, use:
Set global commands:
```bash
node src/miscellaneous/setslashcmds.js
```
Set commands in one server:
```bash
node src/miscellaneous/setslashcmds.js --scope guild --guild-id "paste your server id"
```
To view script help information:
```bash
node src/miscellaneous/setslashcmds.js --help
```
9. Alternatively to using the setslashcmds script, you can use your chosen GLOBAL_BOT_PREFIX to set the bot's commands. If yours is %, then you'd do `%setcmd global` to globally set commands, and `%setcmd guild` to quickly set server-specific slash commands.

### Making changes with Docker
If you modify the bot code, the code must be rebuilt for use with `docker compose`.
Make the code changes, and use `docker compose build loggerbot` to rebuild the code, then it can be started at will using `docker compose up` or `docker compose up -d`

## Installation without Docker

You are mostly on your own selfhosting. Required applications:
- PostgreSQL 14+ (no complex queries, most should work)
- Redis
- NodeJS 20+ (needs to be old enough to support async syntax and null coalescing - v14?)

1. Setup Postgres and add a superuser (default user works)
2. Clone bot repo and enter the created folder
3. Copy .env.example into .env
4. Fill out **all** fields in it (even Sentry unless you hotpatch it out)
5. `npm install`
7. Set `ENABLE_TEXT_COMMANDS="true"` in .env
8. Start the bot with `node index.js`
9. Use your prefix to set the bot's commands. If yours is %, then you'd do `%setcmd global` to globally set commands, and `%setcmd guild` to quickly set server-specific slash commands

## Non-Docker Usage

```bash
NODE_ENV=production node index.js
```

## Support/Communication
Join the community to talk about contributions and potential help at [Logger's Lounge](https://discord.gg/ed7Gaa3).

## Contributing
Pull requests are welcome as long as it follows the following guidelines:
1. Is your idea really one that a large group of moderators would like?
2. Is your idea scalable?
3. Will your idea cause the bot to hit it's global ratelimit?
4. Have you proposed it in my [support server?](https://discord.gg/ed7Gaa3)

If you have done all of the above steps, then open a pull request and I will review it eventually. Run the styleguide (standard-js) against your code with `npx standard --fix ./`.
