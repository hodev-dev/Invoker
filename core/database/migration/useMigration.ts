const util = require('util');
const exec = util.promisify(require('child_process').exec);
var path = require('path');
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const fsPromises = fs.promises;
const fse = require('fs-extra');
const chalk = require('chalk');

var useMigration = () => {
    async function addToHistory(
        data,
        version,
        backupPath,
        historyPath,
        messege,
        limit,
    ) {
        try {
            const parse = JSON.parse(data);
            if (parse.length >= limit) {
                const removed = parse.shift();
                const response = await fsPromises.unlink(removed.path);
            }
            parse.push({
                version: version,
                messege: messege,
                time: new Date(Date.now()).toLocaleDateString([], {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
                database: 'postgres',
                path: backupPath,
            });
            console.log('migration snapshot:', chalk.yellow(version));
            await fsPromises.writeFile(
                historyPath,
                JSON.stringify(parse, null, '\t'),
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function backupPostgreSql(__dirname, messege, limit) {
        const version = uuidv4();
        const fileName = version + '.sql';
        const backupPath = path.join(__dirname, `/.versions/${fileName}`);
        const versionsPath = path.join(__dirname, '.versions');
        const historyPath = path.join(__dirname, '.versions', 'version.json');

        try {
            await fse.ensureDir(versionsPath);
            try {
                const data = await fsPromises.readFile(historyPath, 'utf8');
                await addToHistory(
                    data,
                    version,
                    backupPath,
                    historyPath,
                    messege,
                    limit,
                );
            } catch (error) {
                await addToHistory(
                    '[]',
                    version,
                    backupPath,
                    historyPath,
                    messege,
                    limit,
                );
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const { stdout, stderr } = await exec(
                `pg_dump test > ${backupPath}`,
            );
        } catch (error) {
            throw error;
        }
    }

    async function getMessege(arr) {
        const start = arr.indexOf('start_messege');
        const end = arr.indexOf('end_messege');
        return arr.slice(start + 1, end).join();
    }
    return {
        backupPostgreSql,
        getMessege,
    };
};

export default useMigration;
