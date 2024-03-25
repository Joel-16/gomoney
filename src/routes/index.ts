import { Router } from "express";
import Container from "typedi";

import { AccountController, AdminController, FixtureController, TeamController } from "../controllers";
import { authorizationMiddleware } from "../middleware/checkJwt";
import { validationMiddleware } from "../middleware/validation";

import Fixture from "./fixtures.route"
import Team from "./teams.route"
import { ParamDto, SigninDto, SignupDto } from "../types";

const fixtureController = Container.get(FixtureController);
const accountController = Container.get(AccountController);
const adminController = Container.get(AdminController);
const teamController = Container.get(TeamController);
const router = Router();

router.use('/teams',authorizationMiddleware, Team)
router.use('/fixtures',authorizationMiddleware, Fixture)

router.post("/login", validationMiddleware(SigninDto, "body"), accountController.login);
router.post("/register", validationMiddleware(SignupDto, "body"), accountController.register);
router.post("/admin/login", validationMiddleware(SigninDto, "body"), adminController.login);
router.post("/admin/register", validationMiddleware(SignupDto, "body"), adminController.register);


router.get("/link/:id", [authorizationMiddleware, validationMiddleware(ParamDto, "params")], fixtureController.link);
router.get("/search", teamController.search)


export default router;
