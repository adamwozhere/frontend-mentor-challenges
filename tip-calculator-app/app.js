// get input elements
const form = document.querySelector('.form');
const billInput = form.querySelector('#bill-input');
const customTipInput = form.querySelector('#custom-tip-input');
const personsInput = form.querySelector('#persons-input');
const calcTip = form.querySelector('#calculated-tip');
const calcTotal = form.querySelector('#calculated-total');
const resetBtn = form.querySelector('#reset-btn');

// currency formatter
const currency = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// set event listeners
// prevent form default submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
});

// number input handlers
form.addEventListener('input', (e) => {
    if (e.target === billInput) {
        handleNumericInput(e, formatCurrency);
    } else if (e.target === customTipInput) {
        handleNumericInput(e, formatPercentage);
    } else if (e.target === personsInput) {
        handleNumericInput(e, formatInteger);
    }
});

form.addEventListener('mousedown', (e) => {
    // prevent '0' from flashing in custom percent input if mouse is down on button-type inputs
    if (e.target.matches('.form__tip label') || e.target === resetBtn) {
        console.log('radio down: ' + e.target);
        customTipInput.preventDefault = true;
    }
    
    // hide caret on mousedown to prevent it blinking to end position
    if (e.target.matches('input[type="text"]')) {
        e.target.style.caretColor = 'transparent';
    }
});

form.addEventListener('mouseup', (e) => {
    if (e.target.matches('input[type="text"]')) {
        // set caret back to primary cyan colour
        e.target.style.caretColor = 'hsl(172, 67%, 45%)';
    }

    // allow blur event to fire again - to prevent bugs
    customTipInput.preventDefault = false; 
});

customTipInput.addEventListener('blur', (e) => {
    console.log('blur: ' + form.tip.value);
    if (customTipInput.preventDefault) {
        customTipInput.preventDefault = false;

    } else if (customTipInput.value === '%') {
        customTipInput.value = '0%';
    }
});

// Main click event handler
form.addEventListener('click', (e) => {
    // enable reset button and validate bill and persons inputs
    if (e.target.matches('input')) {
        resetBtn.removeAttribute('disabled');
        validateInput(billInput, billInput.value);
        validateInput(personsInput, personsInput.value);
    }
    // if custom tip input: unset other radio buttons and default to 0% tip
    if (e.target.matches('#custom-tip-input')) {
        if (form.tip.value != 'custom' || customTipInput.value === '0%') {
            form.tip.value = 'custom';
            customTipInput.value = '%';
        }
    // 'unset' custom tip if another predefined tip value is selected
    } else if (e.target.matches('input[type="radio"]')) {
        customTipInput.value = '';
    // reset form completely
    } else if (e.target.matches('#reset-btn')) {
        resetForm();
        return;
    }  

    // if text imput type, reset cursor
    if (e.target.matches('input[type="text"]')) {
        setCursor(e);
    }
    calculateBill();
});

// handle keydown in numeric inputs
function handleNumericInput(e, mask) {
    // strip non-digits to get unmasked value
    let n = getRawIntegerValue(e.target.value);

    // validate input
    n = validateInput(e.target, n);

    // set input value to masked value
    e.target.value = mask(n);

    // set cursor to end (only needed for percentage sign?)
    setCursor(e);
    calculateBill();
}

// validate unmasked value
function validateInput(i, n) {
    // if custom tip %, ensure max of 100%
    if (i.matches('#custom-tip-input')) {
        if (n > 100) {
            // remove last digit from calculation
            return n.slice(0, -1);
        }
    // else if number input
    } else if (i.matches('input[type="text"]')) {
        // get corresponding error text element
        let el = getErrorMessageElement(i);
        if (n == 0) {
            el.textContent = 'Can\'t be zero';
            i.setAttribute('data-error', '');
        } else {
            el.textContent = '';
            i.removeAttribute('data-error');
        }
    }
    // maximum amount
    if (n > 100000000) {
        // remove last digit from calculation
        return n.slice(0, -1);
    }
    return n;
}

// calculate and display Tip and Total per person
function calculateBill() {
    console.log('calc bill');
    let billAmount = getRawIntegerValue(billInput.value) / 100;

    let tipPercent = form.tip.value === 'custom'
        ? getRawIntegerValue(customTipInput.value)
        : form.tip.value;

    let numPersons = personsInput.value;

    let tipTotal = billAmount / 100 * tipPercent;
    let billTotal = billAmount + tipTotal;

    let tipPerPerson = tipTotal / numPersons;
    let totalPerPerson = billTotal / numPersons;

    calcTip.textContent =  `$${currency.format(tipPerPerson)}`;
    calcTotal.textContent = `$${currency.format(totalPerPerson)}`;
}

// reset form completely
function resetForm() {
    billInput.value = '';
    billInput.removeAttribute('data-error');
    personsInput.value = '';
    personsInput.removeAttribute('data-error');
    // reset tip value and uncheck radio buttons
    customTipInput.value = '';
    form.tip.value = '';
    let btns = [...form.querySelectorAll('input[name="tip"]')];
    btns.forEach( (b) => {
        b.checked = false;
    });

    getErrorMessageElement(billInput).textContent = '';
    getErrorMessageElement(personsInput).textContent = '';
    
    calcTip.textContent = '$0.00';
    calcTotal.textContent = '$0.00';
    
    resetBtn.setAttribute('disabled', '');
}

// Helper functions
// get error message span for input element
const getErrorMessageElement = (e) => e.previousElementSibling.firstElementChild.nextElementSibling;

// strip non-digits from value
const getRawIntegerValue = (v) => v.replace(/\D/g, '');

// format unmasked number as integer (NaN returns 0)
const formatInteger = (n) => parseInt(n) || '';

// format unmasked number as currency
function formatCurrency(n) {
    let c = currency.format(n / 100);
    if (c == '0.00') {
        c = '';
    }
    return c;
}
// format unmasked number as percentage
function formatPercentage(n) {
    console.log('formnat percent for ' + n);
    if (isNaN(parseInt(n))) {
        return '%';
    } else if (n == 0) {
        return '0%';
    } else {
        return `${formatInteger(n)}%`;
    }
}

// always set cursor to end
function setCursor(e) {
    let end = e.target.value.length;
    // move left of percentage sign
    if (e.target.matches('#custom-tip-input')) {
        end -= 1;
    }
    e.target.setSelectionRange(end, end);
    e.target.focus();
}