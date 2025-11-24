import {PermissionKey} from './permissions.enum';
import {RoleKey} from './role.enum';

export const RolePermissions: Record<RoleKey, PermissionKey[]> = {
  // Admin
  [RoleKey.Admin]: [
    PermissionKey.CreateProduct,
    PermissionKey.ViewProduct,
    PermissionKey.DeleteProduct,

    PermissionKey.ViewOrders,
    PermissionKey.CreateOrders,
    PermissionKey.DeleteOrders,

    PermissionKey.ViewUsers,
    PermissionKey.AddUser,
    PermissionKey.RemoveUser,

    PermissionKey.AddToCart,
    PermissionKey.ViewCart,
    PermissionKey.RemoveFromCart,
  ],

  //  Customer
  [RoleKey.Customer]: [
    PermissionKey.ViewProduct,

    PermissionKey.CreateOrders,
    PermissionKey.ViewOrders,
    PermissionKey.DeleteOrders,

    PermissionKey.AddToCart,
    PermissionKey.ViewCart,
    PermissionKey.RemoveFromCart,
  ],
};
