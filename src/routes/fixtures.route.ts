import { Router } from "express";
import Container from "typedi";

import { FixtureController } from "../controllers";
import { authorizationMiddleware } from "../middleware/checkJwt";
import { validatorLogin, validatorRegister, validatorEditProfile } from "../middleware/validation";

const fixtureController = Container.get(FixtureController);
const router = Router();

router.post("/", [validatorLogin], fixtureController.createFixture);
router.get("/", [validatorRegister], fixtureController.getAllFixtures);
router.get("/:id", [validatorRegister], fixtureController.getFixture);
router.patch("/:id", [authorizationMiddleware, validatorEditProfile], fixtureController.editFixture);
router.delete("/:id", [authorizationMiddleware], fixtureController.deleteFixture);

export default router;
