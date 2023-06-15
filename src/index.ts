import App from './app';
import AuthRoute from './routes/auth.routes';
import BaseRoute from './routes/base.routes';
import CustomerRoute from './routes/customer.routes';
import TestimonialUsageRoute from './routes/testimonial-usage.routes';
import TestimonialRoute from './routes/testimonial.routes';
import UserRoute from './routes/user.routes';

const app = new App([
  new BaseRoute(),
  new UserRoute(),
  new CustomerRoute(),
  new TestimonialRoute(),
  new TestimonialUsageRoute(),
  new AuthRoute(),
]);

app.listen();
