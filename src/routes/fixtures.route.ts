import { Router } from "express";
import Container from "typedi";

import { FixtureController } from "../controllers";
import { validatorFixtureCreate, validatorFixtureUpdate } from "../middleware/validation";

const fixtureController = Container.get(FixtureController);
const router = Router();

router.post("/", [validatorFixtureCreate], fixtureController.createFixture);
router.get("/",fixtureController.getAllFixtures);
router.get("/:id", fixtureController.getFixture);
router.patch("/:id", [validatorFixtureUpdate], fixtureController.editFixture);
router.delete("/:id", fixtureController.deleteFixture);

export default router;
