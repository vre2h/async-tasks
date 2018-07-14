const container = document.querySelector('.result');

async function getAllPostsByUserId () {
  const usersFetch = await fetch('http://jsonplaceholder.typicode.com/users');
  const users = await usersFetch.json();
  const arrOfFetchedPosts = await users.map(({id}) => fetch(
    `http://jsonplaceholder.typicode.com/posts?userId=${id}`
  ));
  const arrOfResponses = await Promise.all(arrOfFetchedPosts);
  const arrOfPromisePosts = await arrOfResponses.map(response => response.json());
  const arrOfPosts = await Promise.all(arrOfPromisePosts);

  arrOfPosts.map((postByUser, idx) => {
    const header = document.createElement('h2');

    header.textContent = `${users[idx].name}'s posts:`;
    container.appendChild(header);

    const ul = document.createElement('ul');

    postByUser.map(post => {
      const li = document.createElement('li');

      li.textContent = post.title;
      ul.appendChild(li);
    });

    container.appendChild(ul);
  })
}

getAllPostsByUserId();
