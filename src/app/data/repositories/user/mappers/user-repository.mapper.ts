import { Mapper } from '../../../../core/base/mapper';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserModel } from '../model/user.model';

export class UserImplementationRepositoryMapper extends Mapper<
  UserModel,
  UserEntity
> {
  mapFrom(param: UserModel): UserEntity {
    return {
      id: param.id,
      fullName: param.fullName,
      avatar: param.avatar,
    };
  }
  mapTo(param: UserEntity): UserModel {
    return {
      id: param.id,
      fullName: param.fullName,
      avatar: param.avatar,
    };
  }
}
