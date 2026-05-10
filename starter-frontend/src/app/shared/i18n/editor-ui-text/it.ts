import type {EditorUiText} from './types';

export const IT: EditorUiText = {
  common: {
    add: 'Aggiungi',
    back: 'Indietro',
    cancel: 'Annulla',
    confirm: 'Conferma',
    delete: 'Elimina',
    login: 'Accedi',
    save: 'Salva',
    send: 'Invia',
    sending: 'Invio…',
  },
  pages: {
    userList: {
      title: 'Utenti',
      subtitle: 'Gestione utenti',
      username: 'Nome utente',
      name: 'Nome',
      email: 'Email',
      active: 'Attivo',
      emailConfirmed: 'Email confermata',
      actions: 'Azioni',
      searchPlaceholder: 'Cerca…',
      bulk: {
        placeholder: 'Azioni in blocco…',
        applyLabel: 'Applica',
        countSingular: '{n} selezionato',
        countPlural: '{n} selezionati',
        activate: 'Attiva',
        deactivate: 'Disattiva',
        delete: 'Elimina',
        confirmDeleteHeader: 'Elimina',
        confirmDeleteMessage: 'Eliminare {n} utente/i? Questa azione è irreversibile.',
      },
    },
    userEdit: {title: 'Modifica utente'},
    userCreate: {title: 'Crea utente'},
    userDelete: {
      title: 'Elimina utente',
      confirmMessage: 'Sei sicuro di voler eliminare questo utente? Questa azione è irreversibile.',
    },
  },
};
