import type {EditorUiText} from './types';

export const NL: EditorUiText = {
  common: {
    add: 'Toevoegen',
    back: 'Terug',
    cancel: 'Annuleren',
    confirm: 'Bevestigen',
    delete: 'Verwijderen',
    login: 'Inloggen',
    save: 'Opslaan',
    send: 'Verzenden',
    sending: 'Verzenden…',
  },
  pages: {
    userList: {
      title: 'Gebruikers',
      subtitle: 'Gebruikersbeheer',
      username: 'Gebruikersnaam',
      name: 'Naam',
      email: 'E-mail',
      active: 'Actief',
      emailConfirmed: 'E-mail bevestigd',
      actions: 'Acties',
      searchPlaceholder: 'Zoeken…',
      bulk: {
        placeholder: 'Bulkacties…',
        applyLabel: 'Toepassen',
        countSingular: '{n} geselecteerd',
        countPlural: '{n} geselecteerd',
        activate: 'Activeren',
        deactivate: 'Deactiveren',
        delete: 'Verwijderen',
        confirmDeleteHeader: 'Verwijderen',
        confirmDeleteMessage: '{n} gebruiker(s) verwijderen? Deze actie is onomkeerbaar.',
      },
    },
    userEdit: {title: 'Gebruiker bewerken'},
    userCreate: {title: 'Gebruiker aanmaken'},
    userDelete: {
      title: 'Gebruiker verwijderen',
      confirmMessage: 'Weet u zeker dat u deze gebruiker wilt verwijderen? Deze actie is onomkeerbaar.',
    },
  },
};
