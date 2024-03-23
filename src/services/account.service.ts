import { compareSync, hashSync } from "bcryptjs";
import { NextFunction } from "express";
import { Service } from "typedi";

import { Account } from "../models";
import { createJwtToken } from "../utils/createJwtToken";
import { CustomError } from "../utils/response/custom-error/CustomError";

@Service()
export class AccountService {
  constructor(private readonly account = Account) {}

  async register(payload, next: NextFunction) {
    const status = await this.account.findOne({ email: payload.email });
    if (status) {
      next(new CustomError(401, "Email already associated with an account"));
    }
    const account= await this.account.create({
      email: payload.email,
      password: hashSync(payload.password, 10),
      firstname: payload.firstname,
      lastname: payload.lastname,
      address: payload.address
    });

    return {
      message: "login successful",
      token: createJwtToken({ id: account._id.toString(), admin: false }),
    };
  }

  async login(payload: { email: string; password: string }, next: NextFunction) {
    const account = await this.account.findOne(
      {
        email: payload.email,
      },
      ["password", "email"]
    );
    if (!account || !compareSync(payload.password, account.password)) {
      next(new CustomError(400, "Invalid credentials"));
    }
    return {
      message: "login successful",
      token: createJwtToken({ id: account._id.toString(), admin: false }),
    };
  }

  async editProfile(id: string, payload, next: NextFunction) {
    let account = await this.account.findOne({ _id: id });
    if (!account) {
      next(new CustomError(400, "Account doesn't exist, Please Sign in again"));
    }
    await this.account.updateOne(
      { _id: id },
      {
        firstname: payload.firstname,
        lastname: payload.lastname,
        address: payload.address,
        email: payload.email,
      }
    );
    return await this.account.findById(id);
  }

  async getProfile(id: string, next: NextFunction) {
    let account = await this.account.findById(id);
    if (!account) {
      next(new CustomError(400, "Account doesn't exist, Please Sign in again"));
    }

    return account;
  }
}
