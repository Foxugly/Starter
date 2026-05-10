import type {EditorUiText} from './types';

export const EN: EditorUiText = {
  common: {
    add: 'Add',
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    login: 'Sign in',
    save: 'Save',
    send: 'Send',
    sending: 'Sending…',
  },
  pages: {
    userList: {
      title: 'Users',
      subtitle: 'User management',
      username: 'Username',
      name: 'Name',
      email: 'Email',
      active: 'Active',
      emailConfirmed: 'Email confirmed',
      actions: 'Actions',
      searchPlaceholder: 'Search…',
      bulk: {
        placeholder: 'Bulk actions…',
        applyLabel: 'Apply',
        countSingular: '{n} selected',
        countPlural: '{n} selected',
        activate: 'Activate',
        deactivate: 'Deactivate',
        delete: 'Delete',
        confirmDeleteHeader: 'Delete',
        confirmDeleteMessage: 'Delete {n} user(s)? This action is irreversible.',
      },
    },
    userEdit: {title: 'Edit user'},
    userCreate: {title: 'Create user'},
    userDelete: {
      title: 'Delete user',
      confirmMessage: 'Are you sure you want to delete this user? This action is irreversible.',
    },
  },
};
