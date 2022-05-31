const form = document.querySelector('#rating-form');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.rating.value === '') {
        console.log('please select a value');
        form.querySelector('#error-msg').removeAttribute('hidden');
        return;
    }
    
    console.log(`submitted rating of ${form.rating.value}`);
    document.querySelector('#rating-value').textContent = form.rating.value;
    document.querySelector('#rating-response').removeAttribute('hidden');
    document.querySelector('#rating-select').setAttribute('hidden', '');
});
