const chalk = require('chalk');
const fs = require('fs');
const fsPromises = fs.promises;

const usePublish = () => {
    const makeTemplate = async (source, destination, replace, name, type) => {
        try {
            let data = await fsPromises.readFile(source, 'utf8');
            replace.forEach(async (collection, index) => {
                data = data.replaceAll(collection.key, collection.value);
            });
            try {
                await fsPromises.access(destination + '.' + type);
                console.log(chalk.yellow(`file ${name} already exists!`));
            } catch (error) {
                await fsPromises.writeFile(destination + '.' + type, data);
                console.log(chalk.green(`file ${name} created`), '>', destination);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        makeTemplate,
    };
};

module.exports = usePublish;
