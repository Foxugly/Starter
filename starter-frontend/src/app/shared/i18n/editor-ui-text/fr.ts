import type {EditorUiText} from './types';

export const FR: EditorUiText = {
  common: {
    add: 'Ajouter',
    back: 'Retour',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    delete: 'Supprimer',
    login: 'Connexion',
    save: 'Enregistrer',
    send: 'Envoyer',
    sending: 'Envoi…',
  },
  pages: {
    userList: {
      title: 'Utilisateurs',
      subtitle: 'Gestion des utilisateurs',
      username: 'Nom d\'utilisateur',
      name: 'Nom',
      email: 'Email',
      active: 'Actif',
      emailConfirmed: 'Email confirmé',
      actions: 'Actions',
      searchPlaceholder: 'Rechercher…',
      bulk: {
        placeholder: 'Actions groupées…',
        applyLabel: 'Appliquer',
        countSingular: '{n} sélectionné',
        countPlural: '{n} sélectionnés',
        activate: 'Rendre actif',
        deactivate: 'Rendre inactif',
        delete: 'Supprimer',
        confirmDeleteHeader: 'Supprimer',
        confirmDeleteMessage: 'Supprimer {n} utilisateur(s) ? Cette action est irréversible.',
      },
    },
    userEdit: {title: 'Modifier l\'utilisateur'},
    userCreate: {title: 'Créer un utilisateur'},
    userDelete: {
      title: 'Supprimer l\'utilisateur',
      confirmMessage: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.',
    },
  },
};
