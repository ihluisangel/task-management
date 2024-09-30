import { Injectable, signal } from '@angular/core';
import {
  ErrorHandlingService
} from '../../../core/error-handler/error-handling.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import {
  GetUsersUseCase
} from '../../../domain/use-cases/users/get-users.usercase';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private _users = signal<UserEntity[]>([]);

  constructor(
    private _getUsersUseCase: GetUsersUseCase,
    private _errorHandler: ErrorHandlingService
  ) {}

  get users(): UserEntity[] {
    return this._users();
  }

  loadUsers(): void {
    this._getUsersUseCase.execute().subscribe({
      next: (data: UserEntity[]) => {
        this._users.set(data);
      },
      error: (error) => {
        this._errorHandler.handleError(error);
      },
    });
  }
}
