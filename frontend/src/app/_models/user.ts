import { Role } from "./role";
import { Poste } from './poste';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    poste: Poste;
    token?: string;
}