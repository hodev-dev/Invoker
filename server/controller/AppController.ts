import App3 from "@client/App3";
import { Render } from "@core/render";
import { User } from "@server/model/User";
import { Request, Response } from "express";
const AppController: IappController = () => {
  const login = async (request: Request, response: Response) => {
    try {
      const users = await User().findById();
      console.log(users);
      Render.react(App3, response, { data: [] });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    login,
  };
};

interface IappController {
  (): {
    login: (Request, Response) => void;
  };
}

export default AppController;
