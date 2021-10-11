const chalk = require('chalk');
const fs = require('fs');
const fsPromises = fs.promises;

const usePublish = () => {
    const makeTemplate = async (source, destination, replace, name, type) => {
        try {
            const data = await fsPromises.readFile(source, 'utf8');

            let newView = replace.map(async (collection, index) => {
                const newData = data.replaceAll(
                    collection.key,
                    collection.value,
                );
                const size =
                    replace.length >= 2 ? replace.length - 1 : replace.length;
                if (index === size) {
                    return '';
                } else {
                    return newData;
                }
            });
            try {
                await fsPromises.access(source);
                console.log(chalk.yellow(`file ${name} already exists!`));
            } catch (error) {
                await fsPromises.writeFile(destination + '.' + type, newView);
                console.log(chalk.green(`file ${name} created`));
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
