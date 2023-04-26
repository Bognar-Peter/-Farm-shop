import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import OrderDetailController from "./order-details/order-details.controller";
import OrdersController from "./orders/orders.controller";
import PartnersController from "./partners/partners.controller";
import ProductsController from "./products/products.controller";
import RatingsController from "./ratings/ratings.controller";
// import AuthorController from "./author/author.controller";
// import PostController from "./post/post.controller";
// import RecipeController from "./recipe/recipe.controller";
// import ReportController from "./report/report.controller";
import UserController from "./user/user.controller";

new App([
    new AuthenticationController(),
    new UserController(),
    new ProductsController(),
    new OrdersController(),
    new PartnersController(),
    new RatingsController(),
    new OrderDetailController(),
]);
