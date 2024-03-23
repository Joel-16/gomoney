import { Request, Response, NextFunction } from "express";
import validator from "validator";

import { CustomError } from "../utils/response/custom-error/CustomError";
import { ErrorValidation } from "../utils/response/custom-error/types";


export const validatorTeamCreate = (req: Request, res: Response, next: NextFunction) => {
    let { name, code_name, description, stadium, coach } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    if (validator.isEmpty(name)) {
        errorsValidation.push({ name: "Name field is required" });
    }

    if (validator.isEmpty(code_name)) {
        errorsValidation.push({ code_name: "Code name field is required" });
    }

    if (validator.isEmpty(description)) {
        errorsValidation.push({ description: "Description field is required" });
    }

    if (validator.isEmpty(stadium)) {
        errorsValidation.push({ stadium: "Stadium field is required" });
    }

    if (validator.isEmpty(coach)) {
        errorsValidation.push({ coach: "Coach field is required" });
    }

    if (errorsValidation.length !== 0) {
        const customError = new CustomError(400, "Team validation error", errorsValidation);
        return next(customError);
    }
    return next();

}

export const validatorTeamUpdate = (req: Request, res: Response, next: NextFunction) => {
    let { name, code_name, description, stadium, coach } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    if (name && validator.isEmpty(name)) {
        errorsValidation.push({ name: "Name field is required" });
    }

    if (code_name && validator.isEmpty(code_name)) {
        errorsValidation.push({ code_name: "Code name field is required" });
    }

    if (stadium && validator.isEmpty(stadium)) {
        errorsValidation.push({ stadium: "Stadium field is required" });
    }

    if (coach && validator.isEmpty(coach)) {
        errorsValidation.push({ coach: "Coach field is required" });
    }

    if (errorsValidation.length !== 0) {
        const customError = new CustomError(400, "Team validation error", errorsValidation);
        return next(customError);
    }
    return next();

}

export const validatorFixtureCreate = (req: Request, res: Response, next: NextFunction) => {
    const { home, away, time } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    if (validator.isEmpty(home)) {
        errorsValidation.push({ home: "Home team field is required" });
    }

    if (validator.isEmpty(away)) {
        errorsValidation.push({ away: "Away team field is required" });
    }

    if (validator.isEmpty(time)) {
        errorsValidation.push({ time: "Time of the fixture field is required" });
    }

    if (errorsValidation.length !== 0) {
        const customError = new CustomError(400, "Fixture validation error", errorsValidation);
        return next(customError);
    }
    return next();
}


export const validatorFixtureUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { home, away, time } = req.body;
    const errorsValidation: ErrorValidation[] = [];

    if (home && validator.isEmpty(home)) {
        errorsValidation.push({ home: "Home team field cannot be empty" });
    }

    if (away && validator.isEmpty(away)) {
        errorsValidation.push({ away: "Away team field cannot be empty" });
    }

    if (time && validator.isEmpty(time)) {
        errorsValidation.push({ time: "Time of the fixture field cannot be empty" });
    }

    if (errorsValidation.length !== 0) {
        const customError = new CustomError(400, "Fixture validation error", errorsValidation);
        return next(customError);
    }
    return next();
}
