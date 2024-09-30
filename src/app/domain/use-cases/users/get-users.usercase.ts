import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../core/base/use-case';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.respository';

@Injectable({
  providedIn: 'root'
})
export class GetUsersUseCase implements UseCase<void, UserEntity[]> {

  constructor(private userRepository: UserRepository) { }

  execute(): Observable<UserEntity[]> {
      return this.userRepository.getUsers();
  }
}
