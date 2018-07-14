const urls =  [
  'http://jsonplaceholder.typicode.com/posts?userId=1',
  'http://jsonplaceholder.typicode.com/posts?userId=2',
  'http://no'
];

Promise.all(urls.map(url => fetch(url).catch(err => err)))
  .then(arrOfFetches => arrOfFetches.map(elem => elem instanceof Error ? elem : elem.json()))
  .then(arrOfResolves => Promise.all(arrOfResolves))
  .then(arrOfResults => console.log(arrOfResults))
