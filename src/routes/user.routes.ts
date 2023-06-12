import { Request, Response, Router } from "express";
import { Routes } from "../interfaces/route.interface";

class UserRoute implements Routes {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initUserRoute();
  }

  public initUserRoute() {
    // TODO: getAllUser
    this.router.get(`${this.path}`, (_req: Request, res: Response) => {
      return res.status(200).json({ ok: true, message: `list of users` });
    });

    // TODO: getUserById
    this.router.get(`${this.path}/:id`, (req: Request, res: Response) => {
      const { id: userId } = req.params;
      console.log(
        "🚀 ~ file: user.routes.ts:20 ~ UserRoute ~ this.router.get ~ userId",
        userId
      );
      return res.status(200).json({ ok: true, message: `user's detail` });
    });

    // TODO: createUser
    this.router.post(`${this.path}`, (req: Request, res: Response) => {
      const { body: userBody } = req;
      console.log(
        "🚀 ~ file: user.routes.ts:30 ~ UserRoute ~ this.router.post ~ userBody",
        userBody
      );
      return res
        .status(200)
        .json({ ok: true, message: `users with email was create succesfully` });
    });

    // TODO: updateUserById
    this.router.put(`${this.path}/:id`, (req: Request, res: Response) => {
      const { id: userId } = req.params;
      console.log(
        "🚀 ~ file: user.routes.ts:42 ~ UserRoute ~ this.router.put ~ userId",
        userId
      );
      const { body: userBody } = req;
      console.log(
        "🚀 ~ file: user.routes.ts:47 ~ UserRoute ~ this.router.put ~ userBody",
        userBody
      );
      return res
        .status(200)
        .json({ ok: true, message: `user's update successfully` });
    });

    // TODO: deleteUserById
    this.router.delete(`${this.path}/:id`, (req: Request, res: Response) => {
      console.log("Parametros del request ", req.params);
      const { id: userId } = req.params;
      console.log(
        "🚀 ~ file: user.routes.ts:60 ~ UserRoute ~ this.router.get ~ userId",
        userId
      );
      return res
        .status(200)
        .json({ ok: true, message: `user's deleted successfully` });
    });
  }
}

export default UserRoute;
