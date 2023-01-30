import { asyncModal } from './async-modal';
import { showModal } from './modal';

export const modal = {
  show: showModal,
  promise: asyncModal,
}

export type { AsyncModal } from './async-modal';
export type { Modal } from './modal';
