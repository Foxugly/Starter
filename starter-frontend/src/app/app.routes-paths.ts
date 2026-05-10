export const ROUTES = {
  home: () => ['/home'] as const,
  auth: {
    register: () => ['/register'] as const,
    registerPending: () => ['/register/confirmation'] as const,
    login: () => ['/login'] as const,
    changePassword: () => ['/change-password'] as const,
    resetPasswordRequest: () => ['/reset-password'] as const,
    resetPasswordConfirm: (uid: string, token: string) => ['/user/reset-password', uid, token] as const,
    confirmEmail: (uid: string, token: string) => ['/user/confirm-email', uid, token] as const,
  },
  user: {
    add: () => ['/user/add'] as const,
    edit: (userId: number) => ['/user', userId, 'edit'] as const,
    delete: (userId: number) => ['/user', userId, 'delete'] as const,
    list: () => ['/user/list'] as const,
  },
};
