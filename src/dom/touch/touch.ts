import { Controller } from '../../controller/controller';

export const showTouchButtons = () => {
  const div: HTMLElement = document.querySelector('.mobile-controls');
  div.style.opacity = '1';
};

export const hideTouchButtons = () => {
  const div: HTMLElement = document.querySelector('.mobile-controls');
  div.style.opacity = '0';
};

export const touchControls = (controller: Controller, direction: string): void => {
  const control = document.getElementById(direction);

  control.addEventListener('touchstart', () => {
    controller[direction] = true;
  });
  control.addEventListener('mousedown', () => {
    controller[direction] = true;
  });

  control.addEventListener('touchend', () => {
    controller[direction] = false;
  });
  control.addEventListener('mouseup', () => {
    controller[direction] = false;
  });
};
