import { Router } from "express";
import Container from "typedi";

import { FixtureController } from "../controllers";
import { validationMiddleware } from "../middleware/validation";
import { FixtureDto, ParamDto } from "../types";

const fixtureController = Container.get(FixtureController);
const router = Router();

router.post("/", validationMiddleware(FixtureDto, "body"), fixtureController.createFixture);
router.get("/",fixtureController.getAllFixtures);
router.get("/:id", validationMiddleware(ParamDto, "params"),fixtureController.getFixture);
router.patch("/:id", validationMiddleware(FixtureDto, "body", true), validationMiddleware(ParamDto, "params"), fixtureController.editFixture);
router.delete("/:id",validationMiddleware(ParamDto, "params"), fixtureController.deleteFixture);

export default router;
