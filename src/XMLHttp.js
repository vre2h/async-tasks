const xmlContainer = document.querySelector('.xml-result');
const xhr = new XMLHttpRequest();
const method = 'GET';
const url = 'http://jsonplaceholder.typicode.com/users';

xhr.open(method, url, true);

xhr.onreadystatechange = function() {};

xhr.addEventListener('readystatechange', () => {
  if (xhr.readyState !== xhr.DONE) {
    return;
  }

  if (xhr.status !== 200) {
    return alert('Oops! It seems we have an error!');
  }

  const users = JSON.parse(xhr.responseText);
  users.map(({ id, name }) => {
    const postUrl = `http://jsonplaceholder.typicode.com/posts?userId=${id}`;
    const postXhr = new XMLHttpRequest();
    postXhr.open('GET', postUrl);
    postXhr.addEventListener('readystatechange', () => {
      if (postXhr.readyState !== postXhr.DONE) {
        return;
      }

      if (postXhr.status !== 200) {
        return alert('Oops! It seems we have an error!');
      }

      const header = document.createElement('h2');
      header.textContent = `${name}'s posts:`;
      xmlContainer.appendChild(header);
      const ul = document.createElement('ul');
      const posts = JSON.parse(postXhr.responseText);
      posts.map(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        ul.appendChild(li);
      });
      xmlContainer.appendChild(ul);
    });
    postXhr.send();
  });
});

xhr.send();
