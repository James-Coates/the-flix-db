(function() {
  function createRowElement(data) {
    const rowElement = document.createElement('tr');
    const columns = ['description', 'url', 'method', 'request', 'response'];
    columns.forEach(function(column) {
      const columnElement = document.createElement('td');
      columnElement.innerText = data[column];
      rowElement.appendChild(columnElement);
    });
    return rowElement;
  }
  const apiDocsRepository = (function() {
    // API Endpoints table

    const repository = [
      {
        description: 'Get a list of all movies to the user',
        url: '/movies',
        method: 'GET',
        request: '-',
        response: 'A JSON object containing data of all movies',
      },
      {
        description: 'Get data about a single movie by title',
        url: '/movies/:title',
        method: 'GET',
        request: '-',
        response: 'A JSON object containing data of the single movie requested',
      },
      {
        description: 'Get data about a genre by name',
        url: '/genres/:name',
        method: 'GET',
        request: '-',
        response: 'A JSON object containing data of the requested genre',
      },
      {
        description: 'Get data about a director by name',
        url: '/directors/:name',
        method: 'GET',
        request: '-',
        response: 'A JSON object containing data of the requested director (bio, birth year, death year)',
      },
      {
        description: 'Add new user',
        url: '/users',
        method: 'POST',
        request: 'A JSON object containing data of the new user details (username, password, email, date of birth)',
        response: 'A JSON object containing data of the added user details (including unique ID)',
      },
      {
        description: 'Update user',
        url: '/users/:username',
        method: 'PUT',
        request: 'A JSON object containing data of the updated user details (username, password, email, date of birth)',
        response: 'A JSON object containing data of the updated user details',
      },
      {
        description: 'Add movie to user favourites',
        url: '/users/:username/movies/:movieid',
        method: 'POST',
        request: '-',
        response: 'A JSON object containing data of the updated user including favourited movies',
      },
      {
        description: 'Remove movie from user favourites',
        url: '/users/:username/movies/:movieid',
        method: 'DELETE',
        request: '-',
        response: 'A JSON object containing data of the updated user including favourited movies',
      },
      {
        description: 'Delete user',
        url: '/users/:id',
        method: 'DELETE',
        request: '-',
        response: 'A message saying the user has been deleted',
      },
    ];

    function getAll() {
      return repository;
    }

    // Returned variables and functions
    return { getAll };
  })();
  // End of apiDocRepository

  // Loop through repository and create row elements for each object
  const tableBody = document.getElementById('endPointsTable');

  apiDocsRepository.getAll().forEach(function(endPoint) {
    const rowElement = createRowElement(endPoint);
    tableBody.appendChild(rowElement);
  });
})();
