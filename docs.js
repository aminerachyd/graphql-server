// Petite documentation pour ApolloServer
const { ApolloServer, gql } = require("apollo-server");

// typeDefs ou Schema
const typeDefs = gql`
  # Ces types sont pour définir la structures des données qu'on va demander depuis le serveur GraphQL
  type Book {
    """
    Ceci est une description de cet attribut
    """
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  # Au lieu d'expliciter les arguments au niveau de la mutation
  # On peut regrouper les arguments sous un "input"
  input BookInput {
    title: String
    author: String
  }

  # Définit les signatures des méthodes de demandes de données
  type Query {
    getBooks: [Book]
    getAuthors: [Author]
  }

  # Définit les signatures des méthodes d'écriture sur les données
  type Mutation {
    addBook(title: String!, author: String!): Book
    addBook2(book: BookInput): Book
  }
`;

// Un mini persistance
const books = [
  {
    title: "The Awakening",
    author: {
      name: "Kate Chopin",
    },
  },
  {
    title: "City of Glass",
    author: {
      name: "Kate Chopin",
    },
  },
];

const authors = [
  {
    name: "Kate Chopin",
    books: books,
  },
  {
    name: "Paul Auster",
    books: books,
  },
];

// Implémentatiojn des méthodes définies dans le typeDefs
const resolvers = {
  Query: {
    getBooks: () => books,
    getAuthors: () => authors,
  },
  Mutation: {
    // Le premier argument est autre chose que les arguments saisis par le client
    addBook: (_, { title, author }) => {
      const book = {
        title: title,
        author: {
          name: author,
          books: books,
        },
      };
      return book;
    },
    addBook2: (_, { book }) => {
      const { title, author } = book;
      return {
        title: title,
        author: {
          name: author,
          books: books,
        },
      };
    },
  },
};

// Initilisation du serveur graphql ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Mettre ceux-ci en faux pour désactiver le playground
  playground: true,
  introspection: true,
});

// La méthode listen lance le serveur
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
