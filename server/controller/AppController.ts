import Validator from '@core/validator';
import { Request, Response } from 'express';

var AppController = {
	test: (request: Request, response: Response) => {
		var rules = {
			name: ["min:5"],
			family: ["required"],
		};

		var body = {
			"name": '',
		}

		const v = Validator.useValidation(rules, body);
		v.then((data) => {
			response.json({ data });
		}).catch((err) => {
			response.json({ error: err });
		});
	},
}



export default AppController;
