const themeToggleRef = document.querySelector('[id="theme-switch-toggle"]');

const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};

saveUserThemeWhenPageRefresh();

themeToggleRef.addEventListener('change', onThemeChange);

function onThemeChange() {
    replaceSelectorsOnBodyRef();
}

function replaceSelectorsOnBodyRef() {
    if (document.body.classList.contains(Theme.LIGHT)) {
        document.body.classList.replace(Theme.LIGHT, Theme.DARK);
        saveUserThemeInLocalStorage(Theme.DARK);
        return;
    }

    document.body.classList.replace(Theme.DARK, Theme.LIGHT);
    saveUserThemeInLocalStorage(Theme.LIGHT);
}

function saveUserThemeInLocalStorage(theme) {
    localStorage.setItem('theme', theme);
}

function saveUserThemeWhenPageRefresh() {
    const userTheme = localStorage.getItem('theme');

    if (userTheme === Theme.DARK) {
        document.body.classList.replace(Theme.LIGHT, Theme.DARK);
        themeToggleRef.checked = true;
    }
}
