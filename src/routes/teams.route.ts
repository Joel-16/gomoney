import { Router } from "express";
import Container from "typedi";

import { TeamController } from "../controllers";
import { validationMiddleware, cacheMiddleware } from "../middleware";
import { ParamDto, TeamDto } from "../types";

const teamController = Container.get(TeamController);
const router = Router();

router.get("/", cacheMiddleware, teamController.getAllTeams);
router.post("/", validationMiddleware(TeamDto, "body"), teamController.createTeam);
router.get("/:id",  validationMiddleware(ParamDto, "params"),teamController.getTeam);
router.patch("/:id", validationMiddleware(TeamDto, "body", true) , validationMiddleware(ParamDto, "params"),teamController.editTeam);
router.delete("/:id", validationMiddleware(ParamDto, "params"), teamController.deleteTeam);

export default router;
