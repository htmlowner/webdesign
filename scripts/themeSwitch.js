function toggleTheme() {
    const body = document.body;
    const menu = document.querySelector('.menu');
    const header = document.querySelector('.header');
    const contents = document.querySelector('.contents');
    const columns = document.querySelectorAll('.column');
    const back = document.querySelectorAll('.back');
    const mainWindow = document.querySelectorAll('.mainWindow');
    const edit = document.querySelectorAll('.edit');
    const columnns = document.querySelectorAll('.columnn');
    const modal = document.querySelectorAll('.modalContent');

    body.classList.toggle('dark-mode');
    menu.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    contents.classList.toggle('dark-mode');
    columns.forEach(column => column.classList.toggle('dark-mode'));
    back.forEach(back => back.classList.toggle('dark-mode'));
    mainWindow.forEach(window => window.classList.toggle('dark-mode'));
    edit.forEach(edit => edit.classList.toggle('dark-mode'));
    columnns.forEach(columnn => columnn.classList.toggle('dark-mode'));
    modal.forEach(modalElement => modalElement.classList.toggle('dark-mode')); // Исправлено

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const menu = document.querySelector('.menu');
    const header = document.querySelector('.header');
    const contents = document.querySelector('.contents');
    const columns = document.querySelectorAll('.column');
    const back = document.querySelectorAll('.back');
    const mainWindow = document.querySelectorAll('.mainWindow');
    const edit = document.querySelectorAll('.edit');
    const columnns = document.querySelectorAll('.columnn');
    const modal = document.querySelectorAll('.modalContent');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        menu.classList.add('dark-mode');
        header.classList.add('dark-mode');
        contents.classList.add('dark-mode');
        columns.forEach(column => column.classList.add('dark-mode'));
        back.forEach(back => back.classList.add('dark-mode'));
        mainWindow.forEach(window => window.classList.add('dark-mode'));
        edit.forEach(edit => edit.classList.add('dark-mode'));
        columnns.forEach(columnn => columnn.classList.add('dark-mode'));
        modal.forEach(modalElement => modalElement.classList.add('dark-mode')); // Исправлено
    }
}


window.onload = loadTheme;