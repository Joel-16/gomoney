import { Router } from "express";
import Container from "typedi";

import { TeamController } from "../controllers";
import {  validatorTeamCreate, validatorTeamUpdate } from "../middleware/validation";

const teamController = Container.get(TeamController);
const router = Router();

router.post("/", [validatorTeamCreate], teamController.createTeam);
router.get("/",  teamController.getAllTeams);
router.get("/:id",  teamController.getTeam);
router.patch("/:id", [validatorTeamUpdate] , teamController.editTeam);
router.delete("/:id",  teamController.deleteTeam);

export default router;
