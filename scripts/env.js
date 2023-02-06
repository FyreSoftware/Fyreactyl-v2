const fs = require("node:fs")
const {join} = require("path");
require("dotenv/config")
const rootFolder = process.cwd()

async function copyEnv(dir) {
    try {
        await fs.copyFile(`${rootFolder}/.env`, dir, () => {})
        console.log("✅ copied .env to " + dir)
    } catch(e) {
        console.log(e)
    }
}
const UNIX_SLASHES_REGEX = /\/apps\/client/;
const WIN_SLASHES_REGEX = /\\apps\\client/;

const DEFAULT_PORT = "3001"
async function updateScript() {
    try {
        const port = process.env.PORT_CLIENT;
        if (!port) return;

        let dir = join(process.cwd(), "apps", "client");
        const unixMatch = process.cwd().match(UNIX_SLASHES_REGEX);
        const winMatch = process.cwd().match(WIN_SLASHES_REGEX);

        if (unixMatch || winMatch) {
            dir = process.cwd();
        }

        const jsonFilePath = join(dir, "package.json");
        const json = JSON.parse(await fs.readFile(jsonFilePath, "utf8"));

        if (!json.scripts.start.includes(`-p ${DEFAULT_PORT}`) && port === DEFAULT_PORT) {
            json.scripts.start = "yarn next start -p " + DEFAULT_PORT; // reset the port back to default
        } else {
            json.scripts.start = `yarn next start -p ${port}`;
        }

        await fs.writeFile(jsonFilePath, JSON.stringify(json, null, 2));
    } catch (e) {
        console.log(e);
        console.log("Could not set the PORT_CLIENT. Continuing build...");
    }
}

function main() {
    copyEnv(`${rootFolder}/apps/client/.env`)
    copyEnv(`${rootFolder}/apps/server/.env`)
    updateScript()
}
main()