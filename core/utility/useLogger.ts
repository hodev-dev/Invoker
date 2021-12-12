// @ts-ignore
import chalk from "chalk";

const useLogger = () => {
    const server = (...logs: any) => {
        let stack: any = new Error().stack;
        const format: any = stack.match(/(?<=at fulfilled \().+(?=\))/g);
        console.log(stack);
        console.log(chalk.blue("LOG:"), format, ...logs);
    };
    const client = (...logs: any) => {
        let stack: any = new Error().stack;
        const format: any = stack.match(/(?<=at eval \().+(?=\))/);
        console.log(chalk.blue("LOG:"), format["0"], ...logs);
    };
    return {
        server,
        client,
    };
};

export default useLogger;
