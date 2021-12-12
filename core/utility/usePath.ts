import path from 'path';

const chalk = require('chalk');
const fs = require('fs');
const fsPromises = fs.promises;

const usePath = () => {

    const project_path = path.join(__dirname, '..', '..');
    const template_path = path.join(__dirname, '..', 'template');
    const seeder_path = path.join(__dirname, '..', '..', 'server', 'database', 'seed');
    const postgres_model_query = path.join(__dirname, '..', 'core', 'database', 'model_query', 'postgres');

    return {
        node_path: path,
        project_path,
        template_path,
        seeder_path,
        postgres_model_query,
    };
};

export default usePath;
