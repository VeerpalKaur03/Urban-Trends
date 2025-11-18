import {PermissionKey} from './permissions.enum';

export const RolePermissions: Record<string, PermissionKey[]> = {
  // Admin
  admin: [
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
  customer: [
    PermissionKey.ViewProduct,

    PermissionKey.CreateOrders,
    PermissionKey.ViewOrders,
    PermissionKey.DeleteOrders,

    PermissionKey.AddToCart,
    PermissionKey.ViewCart,
    PermissionKey.RemoveFromCart,
  ],
};
