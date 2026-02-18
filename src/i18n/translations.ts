export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

const es = {
  // Layout
  'meta.description': 'Gloomhaven - Gestión de Enemigos para tu partida',

  // Header
  'header.tagline': 'Gestor de Enemigos',
  'header.help': 'Ayuda',
  'header.settings': 'Configuración',
  'header.menu': 'Menú',

  // Mobile nav
  'nav.title': 'Navegación',
  'nav.help': 'Ayuda',
  'nav.settings': 'Configuración',

  // Help modal
  'help.title': 'Guía de Uso',
  'help.subtitle': 'Aprende a usar el gestor de enemigos',
  'help.close': 'Cerrar',
  'help.addEnemies.title': 'Añadir Enemigos',
  'help.addEnemies.text': 'Pulsa "Añadir Enemigo" para invocar nuevos enemigos al campo de batalla. Puedes elegir nombre, vida máxima, cantidad y tipo.',
  'help.types.title': 'Tipos de Enemigo',
  'help.types.normal': 'Enemigo estándar',
  'help.types.elite': 'Más fuerte que un normal',
  'help.types.boss': 'Enemigo principal del escenario',
  'help.types.objective': 'Objetivo de misión — solo tiene vida, sin estados',
  'help.health.title': 'Gestión de Vida',
  'help.health.text': 'Usa los botones rojos (-) para aplicar daño y los verdes (+) para curar. Si la vida llega a 0, el enemigo muere automáticamente.',
  'help.statuses.title': 'Estados',
  'help.statuses.poison': 'Veneno: +1 daño recibido por ataque',
  'help.statuses.wound': 'Herida: 1 daño al inicio del turno',
  'help.statuses.immobilize': 'Inmóvil: No puede moverse',
  'help.statuses.disarm': 'Desarme: No puede atacar',
  'help.statuses.stun': 'Aturdido: Pierde su turno',
  'help.statuses.muddle': 'Confuso: Desventaja en ataques',
  'help.statuses.strengthen': 'Fuerte: Ventaja en ataques',
  'help.statuses.shield': 'Escudo: Reduce daño recibido',
  'help.numbering.title': 'Numeración',
  'help.numbering.text': 'Los números se asignan automáticamente. Si eliminas un enemigo, su número queda libre y será reutilizado por el siguiente que crees con el mismo nombre.',
  'help.controls.title': 'Controles de Tarjeta',
  'help.controls.collapse': 'Colapsar: Minimiza la tarjeta para ahorrar espacio',
  'help.controls.duplicate': 'Duplicar: Crea una copia con el siguiente número libre',
  'help.controls.delete': 'Eliminar: Quita al enemigo del campo',

  // Settings modal
  'settings.title': 'Configuración',
  'settings.subtitle': 'Personaliza tu experiencia',
  'settings.close': 'Cerrar',
  'settings.language.label': 'Idioma',
  'settings.language.desc': 'Cambiar el idioma de la aplicación',
  'settings.confirmClear.label': 'Confirmar al limpiar',
  'settings.confirmClear.desc': 'Pedir confirmación antes de eliminar todos los enemigos',
  'settings.autoRemove.label': 'Auto-eliminar al morir',
  'settings.autoRemove.desc': 'Eliminar automáticamente enemigos al llegar a 0 de vida',
  'settings.compact.label': 'Tarjetas compactas',
  'settings.compact.desc': 'Iniciar con las tarjetas de enemigo colapsadas',

  // Enemy Manager - Section header
  'em.title': 'Campo de Batalla',
  'em.subtitle': 'Gestiona los enemigos activos',
  'em.enemies': 'Enemigos',
  'em.totalHp': 'Vida Total',
  'em.clear': 'Limpiar',
  'em.collapse': 'Colapsar',
  'em.expand': 'Expandir',
  'em.addEnemy': 'Añadir Enemigo',

  // Enemy Manager - Empty state
  'em.empty.title': 'Sin enemigos en el campo',
  'em.empty.text': 'Añade enemigos para comenzar a gestionar el combate de tu partida de Gloomhaven',
  'em.empty.button': 'Invocar Enemigo',

  // Enemy Manager - Add modal
  'em.modal.title': 'Invocar Enemigo',
  'em.modal.subtitle': 'Añade un nuevo enemigo al campo de batalla',
  'em.modal.close': 'Cerrar',
  'em.modal.name': 'Nombre del Enemigo',
  'em.modal.namePlaceholder': 'Ej: Guardia Bandido, Esqueleto Arquero...',
  'em.modal.health': 'Vida Máxima',
  'em.modal.quantity': 'Cantidad a Crear',
  'em.modal.quantityDecrease': 'Disminuir',
  'em.modal.quantityIncrease': 'Aumentar',
  'em.modal.quantityLabel': 'enemigos',
  'em.modal.quantityHint': 'Los números se asignan automáticamente reutilizando huecos libres',
  'em.modal.type': 'Tipo de Enemigo',
  'em.modal.cancel': 'Cancelar',
  'em.modal.confirm': 'Invocar',

  // Enemy types
  'type.normal': 'Normal',
  'type.elite': 'Élite',
  'type.boss': 'Jefe',
  'type.objective': 'Objetivo',

  // Enemy card
  'card.number': 'Número',
  'card.name': 'Nombre',
  'card.namePlaceholder': 'Nombre del enemigo',
  'card.collapse': 'Colapsar',
  'card.duplicate': 'Duplicar',
  'card.delete': 'Eliminar',
  'card.drag': 'Arrastrar para reordenar',
  'card.hp': 'Puntos de Vida',
  'card.hpMax': 'Vida máxima',
  'card.clearAll': 'Eliminar todos',

  // Status effects
  'status.negative': 'Estados Negativos',
  'status.positive': 'Estados Positivos',
  'status.poison': 'Veneno',
  'status.poison.desc': 'Veneno: +1 daño recibido por ataque',
  'status.wound': 'Herida',
  'status.wound.desc': 'Herida: 1 daño al inicio del turno',
  'status.immobilize': 'Inmóvil',
  'status.immobilize.desc': 'Inmovilizado: No puede moverse',
  'status.disarm': 'Desarme',
  'status.disarm.desc': 'Desarmado: No puede atacar',
  'status.stun': 'Aturdido',
  'status.stun.desc': 'Aturdido: Pierde su turno',
  'status.muddle': 'Confuso',
  'status.muddle.desc': 'Confundido: Desventaja en ataques',
  'status.strengthen': 'Fuerte',
  'status.strengthen.desc': 'Fortalecido: Ventaja en ataques',
  'status.shield': 'Escudo',
  'status.shield.desc': 'Escudo: Reduce daño recibido',

  // Client-side strings
  'js.confirmClear': '¿Eliminar todos los enemigos del campo de batalla?',
  'js.hpAria': 'vida',

  // Page title
  'page.title': 'Gloomhaven - Gestor de Enemigos',
};

type TranslationKeys = typeof es;
export type TranslationKey = keyof TranslationKeys;

const en: Record<TranslationKey, string> = {
  // Layout
  'meta.description': 'Gloomhaven - Enemy Manager for your game',

  // Header
  'header.tagline': 'Enemy Manager',
  'header.help': 'Help',
  'header.settings': 'Settings',
  'header.menu': 'Menu',

  // Mobile nav
  'nav.title': 'Navigation',
  'nav.help': 'Help',
  'nav.settings': 'Settings',

  // Help modal
  'help.title': 'User Guide',
  'help.subtitle': 'Learn how to use the enemy manager',
  'help.close': 'Close',
  'help.addEnemies.title': 'Add Enemies',
  'help.addEnemies.text': 'Press "Add Enemy" to summon new enemies to the battlefield. You can choose name, max health, quantity, and type.',
  'help.types.title': 'Enemy Types',
  'help.types.normal': 'Standard enemy',
  'help.types.elite': 'Stronger than a normal enemy',
  'help.types.boss': 'Scenario main enemy',
  'help.types.objective': 'Mission objective — only has health, no statuses',
  'help.health.title': 'Health Management',
  'help.health.text': 'Use the red (-) buttons to deal damage and the green (+) buttons to heal. If health reaches 0, the enemy dies automatically.',
  'help.statuses.title': 'Statuses',
  'help.statuses.poison': 'Poison: +1 damage received per attack',
  'help.statuses.wound': 'Wound: 1 damage at start of turn',
  'help.statuses.immobilize': 'Immobilize: Cannot move',
  'help.statuses.disarm': 'Disarm: Cannot attack',
  'help.statuses.stun': 'Stun: Loses its turn',
  'help.statuses.muddle': 'Muddle: Disadvantage on attacks',
  'help.statuses.strengthen': 'Strengthen: Advantage on attacks',
  'help.statuses.shield': 'Shield: Reduces damage received',
  'help.numbering.title': 'Numbering',
  'help.numbering.text': 'Numbers are assigned automatically. If you remove an enemy, its number becomes available and will be reused by the next one you create with the same name.',
  'help.controls.title': 'Card Controls',
  'help.controls.collapse': 'Collapse: Minimizes the card to save space',
  'help.controls.duplicate': 'Duplicate: Creates a copy with the next available number',
  'help.controls.delete': 'Delete: Removes the enemy from the field',

  // Settings modal
  'settings.title': 'Settings',
  'settings.subtitle': 'Customize your experience',
  'settings.close': 'Close',
  'settings.language.label': 'Language',
  'settings.language.desc': 'Change the application language',
  'settings.confirmClear.label': 'Confirm on clear',
  'settings.confirmClear.desc': 'Ask for confirmation before removing all enemies',
  'settings.autoRemove.label': 'Auto-remove on death',
  'settings.autoRemove.desc': 'Automatically remove enemies when health reaches 0',
  'settings.compact.label': 'Compact cards',
  'settings.compact.desc': 'Start with enemy cards collapsed',

  // Enemy Manager - Section header
  'em.title': 'Battlefield',
  'em.subtitle': 'Manage active enemies',
  'em.enemies': 'Enemies',
  'em.totalHp': 'Total HP',
  'em.clear': 'Clear',
  'em.collapse': 'Collapse',
  'em.expand': 'Expand',
  'em.addEnemy': 'Add Enemy',

  // Enemy Manager - Empty state
  'em.empty.title': 'No enemies on the field',
  'em.empty.text': 'Add enemies to start managing combat in your Gloomhaven game',
  'em.empty.button': 'Summon Enemy',

  // Enemy Manager - Add modal
  'em.modal.title': 'Summon Enemy',
  'em.modal.subtitle': 'Add a new enemy to the battlefield',
  'em.modal.close': 'Close',
  'em.modal.name': 'Enemy Name',
  'em.modal.namePlaceholder': 'E.g.: Bandit Guard, Skeleton Archer...',
  'em.modal.health': 'Max Health',
  'em.modal.quantity': 'Quantity to Create',
  'em.modal.quantityDecrease': 'Decrease',
  'em.modal.quantityIncrease': 'Increase',
  'em.modal.quantityLabel': 'enemies',
  'em.modal.quantityHint': 'Numbers are assigned automatically, reusing available gaps',
  'em.modal.type': 'Enemy Type',
  'em.modal.cancel': 'Cancel',
  'em.modal.confirm': 'Summon',

  // Enemy types
  'type.normal': 'Normal',
  'type.elite': 'Elite',
  'type.boss': 'Boss',
  'type.objective': 'Objective',

  // Enemy card
  'card.number': 'Number',
  'card.name': 'Name',
  'card.namePlaceholder': 'Enemy name',
  'card.collapse': 'Collapse',
  'card.duplicate': 'Duplicate',
  'card.delete': 'Delete',
  'card.drag': 'Drag to reorder',
  'card.hp': 'Hit Points',
  'card.hpMax': 'Max health',
  'card.clearAll': 'Remove all',

  // Status effects
  'status.negative': 'Negative Statuses',
  'status.positive': 'Positive Statuses',
  'status.poison': 'Poison',
  'status.poison.desc': 'Poison: +1 damage received per attack',
  'status.wound': 'Wound',
  'status.wound.desc': 'Wound: 1 damage at start of turn',
  'status.immobilize': 'Immobilize',
  'status.immobilize.desc': 'Immobilized: Cannot move',
  'status.disarm': 'Disarm',
  'status.disarm.desc': 'Disarmed: Cannot attack',
  'status.stun': 'Stun',
  'status.stun.desc': 'Stunned: Loses its turn',
  'status.muddle': 'Muddle',
  'status.muddle.desc': 'Muddled: Disadvantage on attacks',
  'status.strengthen': 'Strengthen',
  'status.strengthen.desc': 'Strengthened: Advantage on attacks',
  'status.shield': 'Shield',
  'status.shield.desc': 'Shield: Reduces damage received',

  // Client-side strings
  'js.confirmClear': 'Remove all enemies from the battlefield?',
  'js.hpAria': 'HP',

  // Page title
  'page.title': 'Gloomhaven - Enemy Manager',
};

export type Translations = Record<TranslationKey, string>;

export const translations: Record<Lang, Translations> = { es, en };
