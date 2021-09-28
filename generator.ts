import useSequence from '@core/utility/useSequence';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAsyncData(value, wait) {
    await sleep(wait); // simulate database/network delay...
    console.log({ value });
    return value; // ...then return some data
}

function* sequence() {
    yield () => getAsyncData(1, 1000);
    yield () => getAsyncData(2, 0);
    yield () => getAsyncData(3, 500);
}

const seq = useSequence(sequence);

async function main() {
    seq.runSync();
}

main();
