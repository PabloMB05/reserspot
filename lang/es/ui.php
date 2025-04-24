<?php


return [
    'navigation' => [
        'menu' => 'Menú de Navegación',
        'items' => [
            'dashboard' => 'Panel',
            'users' => 'Usuarios',
            'floors' => 'Pisos',
            'books' => 'Libros',
            'repository' => 'Repositorio',
            'documentation' => 'Documentación',
        ],
    ],
    'dashboard' => [
        'users' => 'Usuarios',
        'floors' => 'Pisos',
        'books' => 'Libros',
        'zones' => 'Zonas',
        'bookcases' => 'Estanterías',
        'description' => [
            'users' => 'Gestiona los usuarios del sistema',
            'floors' => 'Gestiona los pisos y secciones del sistema',
            'books' => 'Gestiona los libros del sistema',
            'zones' => 'Gestiona las zonas del sistema',
            'bookcases' => 'Gestiona las estanterías del sistema',
        ]
    ],
    'user_menu' => [
        'settings' => 'Configuración',
        'logout' => 'Cerrar sesión',
    ],
    'auth' => [
        'failed' => 'Estas credenciales no coinciden con nuestros registros.',
        'throttle' => 'Demasiados intentos de inicio de sesión. Por favor, inténtalo de nuevo en :seconds segundos.',
    ],
    'settings' => [
        'title' => 'Configuración',
        'description' => 'Gestiona tu perfil y configuración de cuenta',
        'navigation' => [
            'profile' => 'Perfil',
            'password' => 'Contraseña',
            'appearance' => 'Apariencia',
            'languages' => 'Idiomas',
        ],
        'profile' => [
            'title' => 'Configuración del perfil',
            'information_title' => 'Información del perfil',
            'information_description' => 'Actualiza tu nombre y dirección de correo electrónico',
            'name_label' => 'Nombre',
            'name_placeholder' => 'Nombre completo',
            'email_label' => 'Dirección de correo',
            'email_placeholder' => 'Dirección de correo',
            'unverified_email' => 'Tu dirección de correo no está verificada.',
            'resend_verification' => 'Haz clic aquí para reenviar el correo de verificación.',
            'verification_sent' => 'Se ha enviado un nuevo enlace de verificación a tu dirección de correo.',
            'save_button' => 'Guardar',
            'saved_message' => 'Guardado',
        ],
        'password' => [
            'title' => 'Configuración de contraseña',
            'update_title' => 'Actualizar contraseña',
            'update_description' => 'Asegúrate de que tu cuenta utilice una contraseña larga y aleatoria para mantenerse segura',
            'current_password_label' => 'Contraseña actual',
            'current_password_placeholder' => 'Contraseña actual',
            'new_password_label' => 'Nueva contraseña',
            'new_password_placeholder' => 'Nueva contraseña',
            'confirm_password_label' => 'Confirmar contraseña',
            'confirm_password_placeholder' => 'Confirmar contraseña',
            'save_button' => 'Guardar contraseña',
            'saved_message' => 'Guardado',
        ],
        'appearance' => [
            'title' => 'Configuración de apariencia',
            'description' => 'Actualiza la configuración de apariencia de tu cuenta',
            'modes' => [
                'light' => 'Claro',
                'dark' => 'Oscuro',
                'system' => 'Sistema'
            ]
        ],
        'languages' => [
            'title' => 'Configuración de idioma',
            'description' => 'Cambia tu idioma preferido',
        ],
    ],
    'validation' => [
            'required' => 'El campo :attribute es obligatorio.',
            'email' => 'El campo :attribute debe ser una dirección de correo válida.',
            'min' => [
                'string' => 'El campo :attribute debe tener al menos :min caracteres.',
            ],
            'max' => [
                'string' => 'El campo :attribute no debe tener más de :max caracteres.',
            ],
            'unique' => 'El campo :attribute ya ha sido tomado.',
            'confirmed' => 'El campo :attribute no coincide.',
    ],
    'common' => [
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'close' => 'Cerrar',
        ],
        'filters'=> [
            'title' => 'Filtros',
            'clear' => 'Limpiar',
        ],
        'delete_dialog' => [
            'success' => 'Usuario eliminado correctamente',
        ],
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
            'first' => 'Primero',
            'last' => 'Último',
        ],
        'per_page' => 'Por página',
        'no_results' => 'No hay resultados',
    ],
    'floors' => [
        'title' => 'Pisos',
        'create' => 'Crear Piso',
        'buttons' => [
            'new' => 'Crear Piso',
        ],
        'filters' => [
            'floor_number' => 'Numero del piso',
            'capacity' => 'Capacidad',
        ],
        'placeholders'=> [
            'floor_number'=>'seleccione un número...',
            'capacity'=> 'introduzca la capacidad',
        ],
        'columns'=>[
            'floor_number' => 'Numero del piso',
            'capacity' => 'Capacidad',
            'created_at' => 'Fecha de creación',
            'actions'=> 'Acciones',

        ],
    ],
    'floor'=>[
        'create' => 'Crear piso',
        'create_description' => 'Formulario de creación del piso',
        'number'=> 'Numero del piso',
        'capacity'=> 'capacidad del piso',
        'buttons'=>[
            'cancel'=> 'cancelar piso',
            'save' => 'Guardar piso',
        ],
    ],
    'zones' => [
        'title' => 'Zonas',
        'create' => 'Crear Zona',
        'buttons' => [
            'new' => 'Crear Zona',
        ],
        'create' => [
            'title' => 'titulo',
            'desc' => 'desc'
        ],
        'filters'=>[
            'number' => 'Número de la Zona',
            'capacity'=> ' Capacidad de la Zona',
        ],
        'placeholders' => [
            'number' => 'Seleccione un número',
            'capacity' => 'Introduzca la capacidad',
        ],
        'columns' => [
            'number' => 'Número',
            'capacity' => 'Capacidad',
            'genre' => 'Género',
            'created_at' => 'Fecha de creación',
            'actions'=> 'Acciones',
        ],
        'cards'=>[
            'create'=>[
                'title'=> 'Crear Zona',
                'description'=> 'Formulario de creación de Zona',
            ],
            'edit'=>[
                'title'=> 'Editar Zona',
                'description'=> 'Formulario en el que podra editar una zona ya creada',
            ],
        ],
        'number'=> 'Numero de la zona',
        'capacity'=> 'Capacidad de la zona',
        'floor' => 'Selecciona el piso en el que se encuentra la zona',
        'select_floor' => 'Introduzca el piso...',
        'genre' => 'Selecciona el género de la zona',
        'select_genre' =>'ej: Horror',
        'delete' => [
            'title' => 'Eliminar zona',
            'description' => '¿Estás seguro de que deseas eliminar esta zona? Esta acción no se puede deshacer.',
        ],
    ],
    'common' => [
        'cancel'=> 'Cancelar',
        'save'=> 'Guardar',
        'update'=> 'Actualizar',
        'showing_results' => 'Mostrando resultados',
        'buttons' => [
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
        ],
        'per_page' => 'Por página:',
        'pagination' => [
            'first' => 'Primera',
            'last' => 'Última',
        ],
    ],
    'bookcases' => [
        'title' => 'Estanterías',
        'buttons' => [
            'new' => 'Nueva Estantería',
        ],
        'filters'=>[
            'bookcase'=> 'Introduce la estanteria',
            'capacity'=> 'Introduce la capacidad',
            'floor'=> 'Intoduce el piso',
            'zone'=> 'Introduce la zona',
            'genres'=> 'Introduce el genero',
        ],
        'placeholders' => [
            'bookcase' => 'Nombre de la estantería',
            'capacity' => 'Capacidad',
            'floor' => 'Piso',
            'zone' => 'Zona',
            'genres' => 'Géneros',
            'title' => 'Título del libro',
            'author' => 'Autor',
            'pages' => 'Número de páginas',
            'publisher' => 'Editorial',
        ],
        'columns' => [
            'bookcase' => 'Estantería',
            'capacity' => 'Capacidad',
            'floor' => 'Piso',
            'zone' => 'Zona',
            'zoneGenre' => 'Género de la zona',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'cards' => [
            'create' => [
                'title' => 'Crear estantería',
                'description' => 'Completa los campos para añadir una nueva estantería a la zona seleccionada.',
            ],
        ],
        'fields' => [
        'name' => 'Nombre de la estantería',
        'bookcase'=> 'Estantería',
        'capacity' => 'Capacidad',
        'floor' => 'Piso',
        'zone' => 'Zona',
        ],
    ],

    'buttons' => [
        'cancel' => 'Cancelar',
        'save' => 'Guardar',
    ],
    'users' => [
        'title' => 'Usuarios',
        'create' => 'Crear Usuario',
        'edit' => 'Editar Usuario',
        'fields' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'name' => 'Nombre',
            'email' => 'Email',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'permisos' => [
            'Users' => [
                'users' => [
                    'view' => 'Ver usuarios',
                    'create' => 'Crear usuarios',
                    'edit' => 'Editar usuarios',
                    'delete' => 'Eliminar usuarios'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'Ver productos',
                    'create' => 'Crear productos',
                    'edit' => 'Editar productos',
                    'delete' => 'Eliminar productos'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'Ver reportes',
                    'export' => 'Exportar reportes',
                    'print' => 'Imprimir reportes'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Acceso a configuración',
                    'modify' => 'Modificar configuración'
                ],

            ],
        ],
        'roles' => [
            'default' => 'Selecciona un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'search' => 'Buscar',
            'name' => 'Nombre del usuario',
            'email' => 'Email del usuario',
        ],
        'placeholders' => [
            'name' => 'Nombre completo del usuario',
            'email' => 'correo@ejemplo.com',
            'password' => 'Contraseña segura',
            'search' => 'Buscar usuarios...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingresa la información para crear un nuevo usuario en el sistema'
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
    'loans' => [
        'columns' => [
            'avaiable' => 'Disponible',
        ],
    ],
    'genres' => [
        'names' => [
            'Science' => 'Ciencia',
            'Romance' => 'Romance',
            'Magical' => 'Mágico',
        ],
    ],
    'books' => [
        'create' => 'Crear Libro',
        'edit' => 'Editar Libro',
        'title' => 'Libros',
        'buttons' => [
            'new' => 'Nuevo libro',
        ],
        'columns' => [
            'title' => 'Título',
            'genres' => 'Géneros',
            'author' => 'Autor',
            'length' => 'Páginas',
            'editor' => 'Editorial',
            'isbn' => 'ISBN',
            'floor' => 'Piso',
            'zone' => 'Zona',
            'bookcase' => 'Estantería',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'fields' => [
            'title' => 'Titulo',
            'email' => 'Email',
            'password' => 'Contraseña',
            'password_optional' => 'Contraseña (opcional)',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
            'rolPpal' => 'Rol Principal',
            'permisos' => 'Permisos Específicos'
        ],
        'columns' => [
            'title' => 'Título',
            'author' => 'Autor',
            'genres' => 'Géneros',
            'editor' => 'Editorial',
            'length' => 'Páginas',
            'bookcase' => 'Estantería',
            'zone' => 'Zona',
            'floor' => 'Piso',
            'created_at' => 'Fecha de creación',
            'actions' => 'Acciones',
        ],
        'gridelements' => [
            'users' => 'Usuarios',
            'products' => 'Productos',
            'reports' => 'Reportes',
            'configurations' => 'Configuración',
        ],
        'permisos' => [
            'Users' => [
                'users' => [
                    'view' => 'Ver usuarios',
                    'create' => 'Crear usuarios',
                    'edit' => 'Editar usuarios',
                    'delete' => 'Eliminar usuarios'
                ],
            ],
            'Products' => [
                'products' => [
                    'view' => 'Ver productos',
                    'create' => 'Crear productos',
                    'edit' => 'Editar productos',
                    'delete' => 'Eliminar productos'
                ],

            ],
            'Reports' => [
                'reports' => [
                    'view' => 'Ver reportes',
                    'export' => 'Exportar reportes',
                    'print' => 'Imprimir reportes'
                ],

            ],
            'Config' => [
                'config' => [
                    'access' => 'Acceso a configuración',
                    'modify' => 'Modificar configuración'
                ],

            ],
        ],
        'roles' => [
            'default' => 'Selecciona un Rol',
            'admin' => 'Administrador',
            'advanced' => 'Usuario Avanzado',
            'usuario' => 'Usuario Básico'
        ],
        'filters' => [
            'search' => 'Buscar',
            'title' => 'Título del Libro',
            'author' => 'Autor del Libro',
        ],
        'placeholders' => [
            'title' => 'Titulo...',
            'author' => 'Autor...',
            'password' => 'Contraseña segura',
            'search' => 'Buscar libros...',
            'passRulings' => 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
        ],
        'tabs' => [
            'userForm' => 'Información Básica',
            'permissionsForm' => 'Roles y Permisos'
        ],
        'cards' => [
            'title' => 'Crear Nuevo Usuario',
            'description' => 'Ingresa la información para crear un nuevo usuario en el sistema'
        ],
        'buttons' => [
            'new' => 'Nuevo Usuario',
            'edit' => 'Editar',
            'save' => 'Guardar',
            'update' => 'Actualizar',
            'cancel' => 'Cancelar',
            'delete' => 'Eliminar',
            'deleting' => 'Eliminando...',
            'saving' => 'Guardando...',
            'retry' => 'Reintentar',
        ],
        'delete' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
        ],
        'delete_dialog' => [
            'title' => '¿Estás seguro?',
            'description' => 'Esta acción no se puede deshacer. Se eliminará permanentemente el usuario del sistema.',
            'success' => 'Eliminado correctamente ;)',
        ],
        'deleted_error' => 'Error al eliminar el usuario',
        'no_results' => 'No hay resultados.',
        'error_loading' => 'Error al cargar los usuarios. Por favor, inténtalo de nuevo.',
        'showing_results' => 'Mostrando :from a :to de :total resultados',
        'pagination' => [
            'previous' => 'Anterior',
            'next' => 'Siguiente',
        ],
    ],
  "books"=> [
    "tabs"=> [
      "basic"=> "Datos básicos",
      "location"=> "Ubicación"
    ],
    "fields"=> [
      "title"=> "Título",
      "author"=> "Autor",
      "editor"=> "Editorial",
      "length"=> "Número de páginas",
      "genres"=> "Géneros",
      "selgenres"=> "Géneros seleccionados"
    ],
    "placeholders"=> [
      "title"=> "Introduce el título del libro",
      "author"=> "Introduce el nombre del autor",
      "editor"=> "Introduce la editorial",
      "length"=> "Número de páginas",
      "genres"=> "Selecciona hasta 3 géneros"
    ],
    "buttons"=> [
      "cancel"=> "Cancelar",
      "save"=> "Guardar",
      "saving"=> "Guardando...",
      "update"=> "Actualizar"
    ],
    "error"=> [
      "create"=> "Hubo un error al crear el libro.",
      "update"=> "Hubo un error al actualizar el libro."
    ],
],


];