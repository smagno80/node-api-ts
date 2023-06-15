import { Router } from 'express';
import { AuthController } from '../auth/controllers/auth.controller';
import { BaseRouter } from '../shared/router/base.router';
import { SharedMiddleware } from '../shared/middleware/share.middleware';

class AuthRoute extends BaseRouter<AuthController, SharedMiddleware> {
  public router = Router();
  public authController = new AuthController();
  constructor() {
    super(AuthController, SharedMiddleware);
    this.initAuthRoutes();
  }

  /**
   * initAuthRoutes
   */
  public initAuthRoutes() {
    this.router.post('/login', this.middleware.passAuth('login'), (req, res) => this.authController.login(req, res));
  }
}

export default AuthRoute;
