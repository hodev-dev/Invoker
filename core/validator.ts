var Validator: V = {
    useValidation: (rules: any, params: any) => {
        var validation = new Promise((resolve, reject) => {
            var error: any = {};
            for (const [key, keyRules] of Object.entries(rules)) {
                var err = Validator.validateEachRule(keyRules, key, params);
                error[key] = err;
            }
            if (!Validator.isEmpty(error)) {
                reject(error);
            } else {
                resolve([]);
            }
        });
        return validation;
    },
    validateEachRule(keyRules: any, key: string, params: any, error: any) {
        var temp: any = [];
        (keyRules as any).flatMap(rule => {
            var err = Validator.switchRules(rule, key, params);
            if (err !== undefined) {
                temp.push(err);
            }
        });
        return temp;
    },
    switchRules(rule: String, key: string, params: any) {
        const nrule = Validator.normalizeKey(rule);
        switch (nrule) {
            case "required":
                return Validator.required(key, params);
            case "email":
                return Validator.email(key, params);
            case "notNull":
                return Validator.notNull(key, params);
            case "boolean":
                return Validator.isBoolean(key, params);
            case "string":
                return Validator.isString(key, params);
            case "integer":
                return Validator.isInteger(key, params);
            case "min":
                return Validator.min(key, params, rule);
            default:
                break;
        }
    },
    normalizeKey: (key: String) => {
        if (key.includes(":")) {
            const pars = key.split(":");
            return pars[0];
        }
        return key;
    },
    required(key: String, params: any) {
        var hasKey = params.hasOwnProperty(key);
        if (!hasKey) {
            return "this field is required";
        }
    },
    email(key: string, params: any) {
        // RFC2822 Email Validation
        const regex_rule = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        var test = regex_rule.test(params[key]);
        if (test === false) {
            return "Please Enter Valid Email Address";
        }
    },
    isEmpty(obj: any) {
        return Object.keys(obj).length === 0;
    },
    notNull: (key, params) => {
        if (params[key] === '') {
            return "This field Most not be null";
        }
    },
    isBoolean: (key, params) => {
        if (typeof params[key] !== "boolean") {
            return "This field most be boolean"
        }
    },
    isString: (key, params) => {
        if (typeof params[key] !== "string") {
            return "This field most be string"
        }
    },
    isInteger: (key, params) => {
        if (Number.isInteger(params[key]) === false) {
            return "This field most be integer";
        }
    },
    min: (key, params, rule) => {
        return rule;
    }

}

interface V {
    useValidation: any,
    validateEachRule: any,
    switchRules: any,
    normalizeKey: any,
    required: any,
    email: any,
    isEmpty: any,
    notNull: any,
    isBoolean: any,
    isString: any,
    isInteger: any,
    min: any
}

export default Validator;