import { Router } from "express";
import Container from "typedi";

import { TeamController } from "../controllers";
import { authorizationMiddleware } from "../middleware/checkJwt";
import { validatorLogin, validatorRegister, validatorEditProfile } from "../middleware/validation";

const teamController = Container.get(TeamController);
const router = Router();

router.post("/", [validatorLogin], teamController.createTeam);
router.get("/", [validatorRegister], teamController.getAllTeams);
router.get("/:id", [validatorRegister], teamController.getTeam);
router.patch("/:id", [authorizationMiddleware, validatorEditProfile], teamController.editTeam);
router.delete("/:id", [authorizationMiddleware], teamController.deleteTeam);

export default router;
