const toggle = document.querySelector('#toggle-1');
const toggleSwitch = toggle.nextElementSibling.querySelector('[data-toggle="switch"]');

toggle.addEventListener('click', () => {
    // get inverse value of aria-checked
    let t = toggle.getAttribute('aria-checked') === 'false';
    // set new aria-checked value to button
    toggle.setAttribute('aria-checked', t);
    // toggle 'checked' on switch html element
    toggleSwitch.dataset.toggle = t === false ? 'switch' : 'switch checked';
    // toggle 'theme' on html body
    document.body.dataset.theme = t === false ? 'light' : 'dark';
});