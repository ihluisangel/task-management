
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.respository';

import {
  UserImplementationRepositoryMapper
} from './mappers/user-repository.mapper';
import { TransactionUsers } from './model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserImplentationService extends UserRepository {
  private userMapper = new UserImplementationRepositoryMapper();

  constructor(private apollo: Apollo) {
    super();
  }

  override getUsers(): Observable<UserEntity[]> {
    const GET_TASKS = gql`
      query {
        users {
          id
          fullName
          avatar
          }
        }
    `;

    return this.apollo
    .watchQuery<{ users: UserEntity[] }>({
      query: GET_TASKS,
    })
    .valueChanges.pipe(
      map((result: TransactionUsers) =>
        result.data.users.map(this.userMapper.mapFrom)
      )
    );
  }
}
