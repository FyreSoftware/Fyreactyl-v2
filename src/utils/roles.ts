export const Permissions = {
  User: {
    ALL: ["CreateUsers", "ManageUsers", "DeleteUsers"],
    Create: "CreateUsers",
    Manage: "ManageUsers",
    Delete: "DeleteUsers",
  },
  Settings: {
    ALL: ["ViewSettings", "UpdateSettings"],
    View: "ViewSettings",
    Update: "UpdateSettings",
  },
  Vouchers: {
    ALL: ["CreateVouchers", "ManageVouchers", "DeleteVouchers"],
    Create: "CreateVouchers",
    Manage: "ManageVouchers",
    Delete: "DeleteVouchers",
  },
  Products: {
    ALL: ["CreateProducts", "ManageProducts", "DeleteProducts"],
    Create: "CreateProducts",
    Manage: "ManageProducts",
    Delete: "DeleteProducts",
  },
};

export const roles = {
  Admin: [
    ...Permissions.User.ALL,
    ...Permissions.Settings.ALL,
    ...Permissions.Vouchers.ALL,
    ...Permissions.Products.ALL,
  ],
  Moderator: [
    ...Permissions.User.ALL,
    Permissions.Settings.View,
    Permissions.Vouchers.Manage,
    Permissions.Products.Manage,
  ],
  Support: [Permissions.User.Manage],
  User: [],
};

export type UserRole = "Admin" | "Moderator" | "Support" | "User";
