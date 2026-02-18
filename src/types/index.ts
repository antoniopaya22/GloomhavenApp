export type EnemyType = 'normal' | 'elite' | 'boss' | 'objective';

export type StatusEffect =
  | 'poison'
  | 'wound'
  | 'immobilize'
  | 'disarm'
  | 'stun'
  | 'muddle'
  | 'strengthen'
  | 'shield';

export interface Enemy {
  id: string;
  name: string;
  number: number;
  type: EnemyType;
  maxHp: number;
  currentHp: number;
  statuses: StatusEffect[];
  isCollapsed: boolean;
}

export interface AppSettings {
  confirmClear: boolean;
  autoRemoveDead: boolean;
  compactCards: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  confirmClear: true,
  autoRemoveDead: true,
  compactCards: false,
};
