const accordion = document.querySelector('[data-component="accordion"]');
const headings = [...accordion.querySelectorAll('h2')];

const defaultPanel = 1; // default panel to show as open; set to null to have all closed.

accordion.classList.add('accordion--enabled');
// insert button html and set attribues
headings.forEach((heading, index) => {
    heading.classList.add('accordion__heading');
    heading.innerHTML = `
        <button
            id="accordion-btn-${index}" 
            data-component="accordion-button" 
            class="accordion__button" 
            aria-controls="accordion-panel-${index}" 
            aria-expanded="${index === defaultPanel ? true : false}"  
        >
            ${heading.innerText}
            <span>
            <svg class="accordion__arrow" aria-hidden="true" width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 .799l4 4 4-4" stroke="#F47B56" stroke-width="2" fill="none" fill-rule="evenodd"/></svg>
            </span>
        </button>
    `;

    // set panel attributes
    let panel = heading.nextElementSibling;
    panel.dataset.component = 'accordion-panel';
    panel.id = `accordion-panel-${index}`;
    panel.setAttribute('aria-labelledby', `accordion-btn-${index}`);
    panel.setAttribute('aria-hidden', index === defaultPanel ? false : true);
    panel.classList.add('accordion__panel');
});


accordion.addEventListener('click', e => {
    // skip if target clicked is not an accordion button
    if (!e.target.matches('button')) return;

    // get panel linked to button
    let panel = document.getElementById(e.target.getAttribute('aria-controls'));

    // get expanded state of heading button, toggle button and panel
    let isExpanded = e.target.getAttribute('aria-expanded') == 'true';
    panel.setAttribute('aria-hidden', isExpanded);
    e.target.setAttribute('aria-expanded', !isExpanded);
  
    // hide all panels except current
    headings.forEach( h => {
        let b = h.firstElementChild; // get button element
        if (b === e.target) return; // skip if current
        b.setAttribute('aria-expanded', false);
        let p = document.getElementById(b.getAttribute('aria-controls'));
        p.setAttribute('aria-hidden', true);    
    });
});