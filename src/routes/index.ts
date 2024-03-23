import { Router } from "express";
import Container from "typedi";

import { AccountController, AdminController } from "../controllers";
import { authorizationMiddleware } from "../middleware/checkJwt";
import { validatorLogin, validatorRegister, validatorEditProfile } from "../middleware/validation";

const accountController = Container.get(AccountController);
const adminController = Container.get(AdminController)
const router = Router();

router.post("/login", [validatorLogin], accountController.login);
router.post("/register", [validatorRegister], accountController.register);

router.post("/admin/login", [validatorLogin], adminController.login);
router.post("/admin/register", [validatorRegister], adminController.register);


router.get("/link/:id", [authorizationMiddleware], accountController.getProfile);
router.patch("/profile", [authorizationMiddleware, validatorEditProfile], accountController.editProfile);

export default router;
