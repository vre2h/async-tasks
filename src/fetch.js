const fContainer = document.querySelector('.fetch-result');

fetch('http://jsonplaceholder.typicode.com/users')
  .then(r => r.json())
  .then(([{ id }]) => {
    return fetch(`http://jsonplaceholder.typicode.com/posts?userId=${id}`);
  })
  .then(r => r.json())
  .then(posts => {
    const list = document.createElement('ul');
    posts.map(post => {
      const li = document.createElement('li');
      li.textContent = post.title;
      list.appendChild(li);
    });
    fContainer.appendChild(list);
  })
  .catch(err => alert(`Oops! It seems that we have an error: ${err}`));
