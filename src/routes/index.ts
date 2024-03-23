import { Router } from "express";
import Container from "typedi";

import { AccountController, AdminController, FixtureController, TeamController } from "../controllers";
import { authorizationMiddleware } from "../middleware/checkJwt";
import { validatorLogin, validatorRegister } from "../middleware/validationAuth";

import Fixture from "./fixtures.route"
import Team from "./teams.route"

const fixtureController = Container.get(FixtureController);
const accountController = Container.get(AccountController);
const adminController = Container.get(AdminController);
const teamController = Container.get(TeamController);
const router = Router();

router.post("/login", [validatorLogin], accountController.login);
router.post("/register", [validatorRegister], accountController.register);

router.use('/teams',authorizationMiddleware, Team)
router.use('/fixtures',authorizationMiddleware, Fixture)

router.post("/admin/login", [validatorLogin], adminController.login);
router.post("/admin/register", [validatorRegister], adminController.register);


router.get("/link/:id", [authorizationMiddleware], fixtureController.link);
router.get("/search", teamController.search)


export default router;
