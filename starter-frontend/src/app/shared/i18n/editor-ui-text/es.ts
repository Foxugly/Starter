import type {EditorUiText} from './types';

export const ES: EditorUiText = {
  common: {
    add: 'Añadir',
    back: 'Volver',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    login: 'Iniciar sesión',
    save: 'Guardar',
    send: 'Enviar',
    sending: 'Enviando…',
  },
  pages: {
    userList: {
      title: 'Usuarios',
      subtitle: 'Gestión de usuarios',
      username: 'Nombre de usuario',
      name: 'Nombre',
      email: 'Correo',
      active: 'Activo',
      emailConfirmed: 'Correo confirmado',
      actions: 'Acciones',
      searchPlaceholder: 'Buscar…',
      bulk: {
        placeholder: 'Acciones en masa…',
        applyLabel: 'Aplicar',
        countSingular: '{n} seleccionado',
        countPlural: '{n} seleccionados',
        activate: 'Activar',
        deactivate: 'Desactivar',
        delete: 'Eliminar',
        confirmDeleteHeader: 'Eliminar',
        confirmDeleteMessage: '¿Eliminar {n} usuario(s)? Esta acción es irreversible.',
      },
    },
    userEdit: {title: 'Editar usuario'},
    userCreate: {title: 'Crear usuario'},
    userDelete: {
      title: 'Eliminar usuario',
      confirmMessage: '¿Está seguro de que desea eliminar este usuario? Esta acción es irreversible.',
    },
  },
};
