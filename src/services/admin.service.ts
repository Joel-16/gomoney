import { compareSync, hashSync } from "bcryptjs";
import { NextFunction } from "express";
import { Service } from "typedi";

import { Admin } from "../models";
import { createJwtToken } from "../utils/createJwtToken";
import { CustomError } from "../utils/response/custom-error/CustomError";

@Service()
export class AdminService {
  constructor(private readonly admin = Admin) {}

  async register(payload, next: NextFunction) {
    const status = await this.admin.findOne({ email: payload.email });
    if (status) {
      next(new CustomError(401, "Email already associated with an admin"));
    }
    const admin =await this.admin.create({
      email: payload.email,
      password: hashSync(payload.password, 10),
      firstname: payload.firstname,
      lastname: payload.lastname,
      address: payload.address
    });
    return {
      message: "successful signup",
      token: createJwtToken({ id: admin._id.toString(), admin: true }),
    };
  }

  async login(payload: { email: string; password: string }, next: NextFunction) {
    const admin = await this.admin.findOne(
      {
        email: payload.email,
      },
      ["password", "email"]
    );
    if (!admin || !compareSync(payload.password, admin.password)) {
      next(new CustomError(400, "Invalid credentials"));
    }
    return {
      message: "login successful",
      token: createJwtToken({ id: admin._id.toString(), admin: true }),
    };
  }

}
