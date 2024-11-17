(function() {
  window.addEventListener('load', function() {
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    var footer = document.querySelector('footer');
    var stats = document.createElement('p');
    stats.textContent = 'Время загрузки страницы: ' + loadTime + ' мс';
    footer.appendChild(stats);
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav a');
  const currentPath = document.location.pathname.split('/').pop();

  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });
});
