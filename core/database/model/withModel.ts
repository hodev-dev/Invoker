import produce from "immer";

type W = <T>(properties: T) => {
    model: () => T,
    create: (newState: T) => T,
    get: (query: any) => void
};


let withModel: W = <T>(properties: T) => {

    const create = (newState: T) => {
        let next: T | any = produce((properties: T, draftState: any) => {
            return { ...draftState, ...newState };
        });
        return next();
    }

    const model = (): T => properties;
    const get = () => { }

    return {
        model,
        create,
        get
    }
}

export default withModel;

