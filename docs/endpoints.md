# Endpoints

| REQUEST                                | URL                              | HTTP METHOD | REQUEST DATA FORMAT                                                   | RESPONSE DATA FORMAT                                       |
| -------------------------------------- | -------------------------------- | ----------- | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Get a list of all movies to the user   | /movies                          | GET         | -                                                                     | * all movies                                               |
| Get data about a single movie by title | /movies/:title                   | GET         | -                                                                     | * the single movie requested                               |
| Get data about a genre by name         | /genres/:name                    | GET         | -                                                                     | * the single genre requested (description)                 |
| Get data about a director by name      | /directors/:name                 | GET         | -                                                                     | * the single genre requested (bio, birth year, death year) |
| Add new user                           | /users                           | POST        | * the new user details (username, password, email, date of birth)     | * the added user (including unique ID)                     |
| Update user                            | /users/:username                 | POST        | * the updated user details (username, password, email, date of birth) | * the added user (description)                             |
| Add movie to user favourites           | /users/:username/movies/:movieid | POST        | -                                                                     | * the updated user including favourited movies             |
| Remove movie from user favourites      | /users/:username/:movie/:movieid | DELETE      | -                                                                     | * the updated user including favourited movies             |
| Delete user                            | /users/:username                 | DELETE      | -                                                                     | A message saying the user has been deleted                 |

> Note: * indicates "**A JSON object containing data of**"