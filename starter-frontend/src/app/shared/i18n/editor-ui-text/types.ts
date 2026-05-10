export type CommonUiText = {
  add: string;
  back: string;
  cancel: string;
  confirm: string;
  delete: string;
  login: string;
  save: string;
  send: string;
  sending: string;
};

export type BulkActionsUiText = {
  placeholder: string;
  applyLabel: string;
  countSingular: string;  // "{n} selected"
  countPlural: string;    // "{n} selected"
  activate: string;
  deactivate: string;
  delete: string;
  confirmDeleteHeader: string;
  confirmDeleteMessage: string;  // "Delete {n} user(s)? ..."
};

export type UserListUiText = {
  title: string;
  subtitle: string;
  username: string;
  name: string;
  email: string;
  active: string;
  emailConfirmed: string;
  actions: string;
  searchPlaceholder: string;
  bulk: BulkActionsUiText;
};

export type UserEditUiText = {
  title: string;
};

export type UserCreateUiText = {
  title: string;
};

export type UserDeleteUiText = {
  title: string;
  confirmMessage: string;
};

export type EditorUiText = {
  common: CommonUiText;
  pages: {
    userList: UserListUiText;
    userEdit: UserEditUiText;
    userCreate: UserCreateUiText;
    userDelete: UserDeleteUiText;
  };
};
