import { asyncModal } from './async-modal';
import { baseModal } from './base-modal';

export const modal = {
  show: baseModal,
  promise: asyncModal,
}

export { ModalContainer } from './modal-container';
export type { Modal } from './base-modal';
export type { AsyncModal } from './async-modal';
