import { IDocsCard } from "../../types/section.interface";
import { IUser } from "../users/users.interface";

export interface IRequest {
  user: IUser
  doc: IDocsCard
}