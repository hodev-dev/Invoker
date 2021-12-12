import usePath from "@core/utility/usePath";
import * as fs from "fs";

const util = require("util");
const exec = util.promisify(require("child_process").exec);
let path = require("path");

const fsPromises = fs.promises;
const fse = require("fs-extra");
const chalk = require("chalk");

let useFactory = () => {

    const fsPromises = fs.promises;

    const path = usePath();

    let separator = (index: number, count: number) => {
        if (index === count) {
            return "";
        }
        return ",";
    };


    let parentheses = (position: string) => {
        if (position === "end") {
            return "\)";
        }
        return "\(";
    };

    let quote = (quote: string) => {
        if (quote === "single") {
            return "'";
        }
        if (quote === "double") {
            return "\"";
        }
        return "";
    };

    const map = (table: any, _index: number) => {
        let string = "";
        const length = Object.keys(table.columns).length - 1;
        Object.keys(table.columns).map((key, index) => {
            string += quote(table.columns[key].quote) +
                table.columns[key].generate(_index) +
                quote(table.columns[key].quote) +
                separator(index, length);
        });
        return string;
    };

    let generate = async (table: any, count: number) => {
        const template_path = path.node_path.join(path.template_path, "insert.text");
        try {
            const file: any = await fsPromises.readFile(template_path, "utf-8");
            const newData: any = file.replace("_TABLE", table.name);
            let temp = "";
            for (let i = 1; i <= count; i++) {
                temp += parentheses("start") +
                    map(table, i) +
                    parentheses("end") +
                    separator(i, count);
            }
            return newData.replace("_DATA", temp);
        } catch (err) {
            console.log(err);
        }

    };

    let makeSeeder = async (table: any, count: any) => {
        const sql: any = await generate(table, count);
        const fileName: any = path.node_path.join(path.seeder_path, table.name + "_seeder" + ".sql");
        try {
            await fsPromises.writeFile(fileName, sql);
            console.log(`create seeder factory:`, table.name, chalk.green("successful"));
        } catch (e) {
            console.log(e);
        }
    };

    return {
        generate,
        makeSeeder,
    };
};

export default useFactory;
