console.log('app.js works');

fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data => {
    console.log(data);
});
