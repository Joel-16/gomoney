export type JwtPayload = {
  id: string;
  admin: boolean
};
export type FixtureDto = {
  home: string;
  away: string;
  venue: string;
  status: string;
}

export type TeamDto = {
  name: string;
  code_name: string;
  stadium: string;
  coach: string;
}
