import { Team } from "./team";

export interface Player {
  id: number;
  name: string;
  age: number;
  team: Team;
  teamId: number;
}