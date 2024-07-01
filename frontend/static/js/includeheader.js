function includeComponent(componentId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}

document.addEventListener('DOMContentLoaded', function() {
    includeComponent('header-placeholder', 'components/header.html');
    includeComponent('footer-placeholder', 'components/footer.html');
});
