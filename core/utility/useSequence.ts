var useSequence = () => {
    async function runSync(sequence) {
        const seq: any = sequence();
        var next;
        const resolve: any = [];
        while (!(next = seq.next()).done) {
            const response: any = await next.value();
            resolve.push(response);
        }
        return resolve;
    }
    async function runAsync(sequence) {
        const seq: any = sequence();
        var next: any;
        const resolve: any = [];
        while (!(next = seq.next()).done) {
            const response: any = next.value();
            resolve.push(response);
        }
        return resolve;
    }
    async function runByIndex(sequence, index) {
        const seq: any = sequence();
        var next: any;
        for (var i = 0; i <= index; ++i) {
            next = seq.next();
            if (next.done === false) {
                if (i === index) {
                    return await next.value();
                }
            } else {
                throw 'Out Of Range';
            }
        }
    }
    return {
        runSync,
        runAsync,
        runByIndex,
    };
};

export default useSequence;
