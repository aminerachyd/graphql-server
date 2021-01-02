const express = require("express");
const app = express();
// ApolloServer integration with Express
const { ApolloServer } = require("apollo-server-express");
// typeDefs and resolvers for our GraphQL server
const { typeDefs, resolvers } = require("./src/schema");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
