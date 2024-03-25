import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export type JwtPayload = {
  id: string;
  admin: boolean;
  sessionID: string;
};

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  address: string
}

export class FixtureDto {
  @IsString()
  @IsNotEmpty()
  home: string;

  @IsString()
  @IsNotEmpty()
  away: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}

export class TeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code_name: string;

  @IsString()
  @IsNotEmpty()
  stadium: string;

  @IsString()
  @IsNotEmpty()
  coach: string;
}

export class ParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
