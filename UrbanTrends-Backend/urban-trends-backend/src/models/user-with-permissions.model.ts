import {PermissionKey} from '../enums/permissions.enum';
import {User} from './user.model';

export interface UserWithPermissions extends User {
  permissions?: PermissionKey[];
}
