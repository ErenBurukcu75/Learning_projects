

document.querySelectorAll('.nav a[data-page]').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const page = this.getAttribute('data-page');
      loadContent(page);
    });
  });

  function loadContent(page) {
    const contentDiv = document.getElementById('content');
    fetch(`${page}.html`)
      .then(response => response.text())
      .then(data => {
        contentDiv.innerHTML = data;
        window.history.pushState({page: page}, '', `${page}.html`);
      })
      .catch(error => console.error('Error loading content:', error));
  }

  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
      loadContent(event.state.page);
    }
  });

  window.addEventListener('load', function() {
    const path = window.location.pathname.split('/').pop().split('.').shift();
    const page = path ? path : 'home';
    loadContent('home');
  });

