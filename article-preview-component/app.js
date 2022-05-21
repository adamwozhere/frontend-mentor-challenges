const shareBtn = document.querySelector('#share-btn');
const sharePanel = document.querySelector('#share-panel');
const footerPanel = document.querySelector('#footer-panel');

shareBtn.addEventListener('click', function() {
    let isExpanded = this.getAttribute('aria-expanded') == 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    sharePanel.setAttribute('aria-hidden', isExpanded);
});