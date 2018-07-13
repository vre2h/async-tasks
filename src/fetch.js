const fContainer = document.querySelector('.fetch-result');

let listOfUsers = [];

fetch('http://jsonplaceholder.typicode.com/users')
  .then(r => r.json())
  .then(users =>
    users.map(user => {
      listOfUsers.push(user);
      return fetch(
        `http://jsonplaceholder.typicode.com/posts?userId=${user.id}`
      );
    })
  )
  .then(arrOfFetchPromises => Promise.all(arrOfFetchPromises))
  .then(arrOfFetchResponses => arrOfFetchResponses.map(r => r.json()))
  .then(arrOfResolvedPromises => Promise.all(arrOfResolvedPromises))
  .then(arrOfPostsByUser =>
    arrOfPostsByUser.map((posts, index) => {
      const header = document.createElement('h2');
      header.textContent = `${listOfUsers[index].name}'s posts:`;
      fContainer.appendChild(header);
      const ul = document.createElement('ul');
      posts.map(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        ul.appendChild(li);
      });
      fContainer.appendChild(ul);
    })
  );
