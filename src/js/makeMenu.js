import menuData from '../database/menu.json';
import menuItemsTemplate from '../templates/menu-items.hbs';

const menuRef = document.querySelector('.js-menu');

const menuItemsMarkup = menuItemsTemplate(menuData);

menuRef.innerHTML = menuItemsMarkup;
