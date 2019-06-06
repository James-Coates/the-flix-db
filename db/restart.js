/* eslint-disable no-console */
function restartDb(array, db) {
  // Empty database
  db.deleteMany({}, err => {
    if (err) return console.error(err);
  });
  array.forEach(item => {
    db.create(item).catch(err => console.error(err));
  });
  console.log(`${db.modelName} database has been reset`);
}

module.exports.restartDb = restartDb;

module.exports.starterMovies = [
  {
    genre: {
      name: 'Thriller',
      description:
        'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.',
    },
    director: {
      name: 'Quentin Tarantino',
      bio:
        'American director and screenwriter whose films are noted for their stylized violence, razor-sharp dialogue, and fascination with film and pop culture.',
      birth: '1963-04-27T00:00:00.000Z',
    },
    title: 'Reservoir Dogs',
    description:
      'When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.',
    imagePath: 'https://bit.ly/2JAgQoB',
    featured: true,
  },
  {
    genre: {
      name: 'Thriller',
      description:
        'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.',
    },
    director: {
      name: 'Quentin Tarantino',
      bio:
        'Quentin Jerome Tarantino (born March 27, 1963) is an American filmmaker and actor. His films are characterized by nonlinear storylines, satirical subject matter, an aestheticization of violence, extended scenes of dialogue, ensemble casts consisting of established and lesser-known performers, references to popular culture and a wide variety of other films, soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, and features of neo-noir film.',
      birth: '1963-04-27T00:00:00.000Z',
    },
    title: 'Pulp Fiction',
    description:
      'The lives of two mob hitmen, a boxer, a gangster & his wife, & a pair of bandits intertwine in tales of violence and redemption.',
    imagePath: 'https://bit.ly/2ShI8jZ',
    featured: true,
  },
  {
    genre: {
      name: 'biography',
      description:
        'A biographical film, or biopic (abbreviation for biographical motion picture), is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character\'s real name is used. They differ from films "based on a true story" or "historical drama films" in that they attempt to comprehensively tell a single person\'s life story or at least the most historically important years of their lives.',
    },
    director: {
      name: 'Martin Scorsese',
      bio:
        "Martin Charles Scorsese (born November 17, 1942) is an American and naturalized-Italian filmmaker and historian, whose career spans more than 50 years. Scorsese's body of work addresses such themes as Italian-American identity (most notably Sicilian), Roman Catholic concepts of guilt and redemption, faith, machismo, modern crime, and gang conflict. Many of his films are also known for their depiction of violence and liberal use of profanity.",
      birth: '1942-11-17T00:00:00.000Z',
    },
    title: 'The Wolf of Wall Street',
    description:
      'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    imagePath: 'https://bit.ly/2ym4aue',
    featured: true,
  },
  {
    genre: {
      name: 'biography',
      description:
        'A biographical film, or biopic (abbreviation for biographical motion picture), is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character\'s real name is used. They differ from films "based on a true story" or "historical drama films" in that they attempt to comprehensively tell a single person\'s life story or at least the most historically important years of their lives.',
    },
    director: {
      name: 'Martin Scorsese',
      bio:
        "Martin Charles Scorsese (born November 17, 1942) is an American and naturalized-Italian filmmaker and historian, whose career spans more than 50 years. Scorsese's body of work addresses such themes as Italian-American identity (most notably Sicilian), Roman Catholic concepts of guilt and redemption, faith, machismo, modern crime, and gang conflict. Many of his films are also known for their depiction of violence and liberal use of profanity.",
      birth: '1942-11-17T00:00:00.000Z',
    },
    title: 'The Aviator',
    description:
      "A biopic depicting the early years of legendary director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.",
    imagePath: 'https://bit.ly/2W0pJOF',
    featured: false,
  },
  {
    genre: {
      name: 'Thriller',
      description:
        "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. The suspense element, found in most films' plots, is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.",
    },
    director: {
      name: 'Steven Spielberg',
      bio:
        'Steven Allan Spielberg (born December 18, 1946) is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history.',
      birth: '1946-12-18T00:00:00.000Z',
    },
    title: 'Bridge of Spies',
    description:
      'During the Cold War, an American lawyer is recruited to defend an arrested Soviet spy in court, and then help the CIA facilitate an exchange of the spy for the Soviet captured American U2 spy plane pilot, Francis Gary Powers.',
    imagePath: 'https://bit.ly/2VYzVqW',
    featured: false,
  },
  {
    genre: {
      name: 'Thriller',
      description:
        'Comedy is a genre of film in which the main emphasis is on humour. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect. Films in this style traditionally have a happy ending (black comedy being an exception). One of the oldest genres in film, some of the very first silent movies were comedies, as slapstick comedy often relies on visual depictions, without requiring sound. When sound films became more prevalent during the 1920s, comedy films took another swing, as laughter could result from burlesque situations but also dialogue.',
    },
    director: {
      name: 'Steven Spielberg',
      bio:
        'Steven Allan Spielberg (born December 18, 1946) is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history.',
      birth: '1946-12-18T00:00:00.000Z',
    },
    title: 'The Terminal',
    description:
      'An Eastern European tourist unexpectedly finds himself stranded in JFK airport, and must take up temporary residence there.',
    imagePath: 'https://bit.ly/2W25xMd',
    featured: false,
  },
  {
    genre: {
      name: 'biography',
      description:
        'A biographical film, or biopic (abbreviation for biographical motion picture), is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character\'s real name is used. They differ from films "based on a true story" or "historical drama films" in that they attempt to comprehensively tell a single person\'s life story or at least the most historically important years of their lives.',
    },
    director: {
      name: 'Steven Spielberg',
      bio:
        'Steven Allan Spielberg (born December 18, 1946) is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history.',
      birth: '1946-12-18T00:00:00.000Z',
    },
    title: "Schindler's List",
    description:
      'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    imagePath: 'https://bit.ly/2JLgbxH',
    featured: false,
  },
  {
    genre: {
      name: 'Action',
      description:
        'Action film is a film genre in which the protagonist or protagonists are thrust into a series of challenges that typically include violence, extended fighting, physical feats, and frantic chases. Action films tend to feature a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero (though a small number of films in this genre have ended in victory for the villain instead).',
    },
    director: {
      name: 'Steven Spielberg',
      bio:
        'Steven Allan Spielberg (born December 18, 1946) is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history.',
      birth: '1946-12-18T00:00:00.000Z',
    },
    title: 'Raiders of the Lost Ark',
    description:
      "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
    imagePath: 'https://bit.ly/2X4097P',
    featured: true,
  },
  {
    genre: {
      name: 'Horror',
      description:
        'A horror film is a film that seeks to elicit fear for entertainment purposes. Initially inspired by literature from authors like Edgar Allan Poe, Bram Stoker, and Mary Shelley, horror has existed as a film genre for more than a century. The macabre and the supernatural are frequent themes. Horror may also overlap with the fantasy, supernatural fiction, and thriller genres.',
    },
    director: {
      name: 'Alfred Hitchcock',
      bio:
        'Sir Alfred Joseph Hitchcock (13 August 1899 – 29 April 1980) was an English film director and producer, widely regarded as one of the most influential filmmakers in the history of cinema. Known as "the Master of Suspense", he directed over 50 feature films in a career spanning six decades, becoming as well known as any of hks to his many interviews, his cameo roles in most of his films, and his hosting and producing of the television anthology Alfred Hitchcock Presents (1955–1965).',
      birth: '1899-08-13T00:00:00.000Z',
      Death: '1980-05-29T00:00:00.000Z',
    },
    title: 'Psycho',
    description:
      "A Phoenix secretary embezzles forty thousand dollars from her employer's client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.",
    imagePath: 'https://bit.ly/2JCgttx',
    featured: true,
  },
  {
    genre: {
      name: 'Thriller',
      description:
        "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. The suspense element, found in most films' plots, is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.",
    },
    director: {
      name: 'Alfred Hitchcock',
      bio:
        'Sir Alfred Joseph Hitchcock (13 August 1899 – 29 April 1980) was an English film director and producer, widely regarded as one of the most influential filmmakers in the history of cinema. Known as "the Master of Suspense", he directed over 50 feature films in a career spanning six decades, becoming as well known as any of hks to his many interviews, his cameo roles in most of his films, and his hosting and producing of the television anthology Alfred Hitchcock Presents (1955–1965).',
      birth: '1899-08-13T00:00:00.000Z',
      Death: '1980-05-29T00:00:00.000Z',
    },
    title: 'Vertigo',
    description:
      'A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.',
    imagePath: 'https://bit.ly/2I5PGCT',
    featured: false,
  },
];

module.exports.starterUsers = [
  {
    favouriteMovies: [],
    username: 'james',
    password: 'password',
    email: 'james@testmail.com',
    birthday: '1992-01-01T00:00:00.000Z',
  },
  {
    favouriteMovies: [],
    username: 'jon',
    password: 'password',
    email: 'jon@testmail.com',
    birthday: '1985-10-13T00:00:00.000Z',
  },
  {
    favouriteMovies: [],
    username: 'sansa',
    password: 'password',
    email: 'sansa@testmail.com',
    birthday: '1993-02-10T00:00:00.000Z',
  },
  {
    favouriteMovies: [],
    username: 'tyrion',
    password: 'password',
    email: 'tyrion@testmail.com',
    birthday: '1978-03-29T00:00:00.000Z',
  },
];
