export interface Theme {
  name: string;
  dark: string;
  light: string;
  apple: string;
}

export const green = {
  name: 'green',
  dark: '#002011',
  light: '#007A3F',
  apple: '#AF2D00'
};

export const blue = {
  name: 'blue',
  dark: '#00121E',
  light: '#024570',
  apple: '#AF2D00'
};

export const purple = {
  name: 'purple',
  dark: '#16001F',
  light: '#530174',
  apple: '#A4AD00'
};

export const addThemes = (el: HTMLElement, listener, ...themes) => {
  themes.forEach(theme => {
    const div = document.createElement('div');

    div.style.background = theme.light;
    div.style.width = '25px';
    div.setAttribute('name', theme.name);
    div.addEventListener('click', () => listener(theme));

    el.appendChild(div);
  });
};
