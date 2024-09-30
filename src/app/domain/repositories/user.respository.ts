import { Observable } from "rxjs";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract getUsers(): Observable<UserEntity[]>;
}
