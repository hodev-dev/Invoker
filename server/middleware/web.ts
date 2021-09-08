export const mid1 = (req, res, next) => {
    console.log('midd');
    next();
};

export const mid2 = (req, res, next) => {
    console.log('mid 2');
    next();
};