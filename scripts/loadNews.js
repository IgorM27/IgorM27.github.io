
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader');
  const dynamicNews = document.getElementById('dynamic-news');
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  const postsPerPage = 5;

  let startIndex = parseInt(localStorage.getItem('startIndex')) || 0;


  function showPreloader() {
    preloader.style.display = 'block';
  }


  function hidePreloader() {
    preloader.style.display = 'none';
  }


  function showError(message) {
    dynamicNews.innerHTML = `<div style="color: red;">⚠️ ${message}</div>`;
  }


  async function fetchData(url) {
    try {
      showPreloader();
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      renderData(data);
    } catch (error) {
      showError('Что-то пошло не так. Пожалуйста, повторите попытку позже.');
      console.error('There has been a problem with your fetch operation:', error);
    } finally {
      hidePreloader();
    }
  }

  function renderData(posts) {
    const filteredPosts = posts.slice(startIndex, startIndex + postsPerPage);
    dynamicNews.innerHTML = filteredPosts.map(post => `
      <div class="news-item">
        <div class="news-content">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      </div>
    `).join('');
    startIndex = (startIndex + postsPerPage) % posts.length;
    localStorage.setItem('startIndex', startIndex);
  }

  fetchData(apiUrl)
    .then(() => {
      console.log('Data fetched successfully');
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
});
