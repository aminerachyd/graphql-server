const { gql } = require("apollo-server-express");
const axios = require("axios");

const typeDefs = gql`
  type Customer {
    id: ID
    name: String
    email: String
    age: Int
  }

  type Mutation {
    addCustomer(name: String!, email: String!, age: Int!): Customer
    deleteCustomer(id: ID!): Customer
    editCustomer(id: ID!, name: String, email: String, age: Int): Customer
  }

  type Query {
    getCustomer(id: ID): Customer
    getCustomers: [Customer]
  }
`;

// // Hardcoded data
// // Should be data retrieved from a database
// const customers = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "jdoe@gmail.com",
//     age: 35,
//   },
//   {
//     id: "2",
//     name: "Steve Doe",
//     email: "steve@gmail.com",
//     age: 40,
//   },
//   {
//     id: "3",
//     name: "Sarah Doe",
//     email: "sdoe@gmail.com",
//     age: 20,
//   },
// ];

const resolvers = {
  Query: {
    getCustomer: (_, { id }) => {
      //   for (let i = 0; i < customers.length; i++) {
      //     if (customers[i].id === id) {
      //       return customers[i];
      //     }
      //   }
      return axios
        .get("http://localhost:3000/customers/" + id)
        .then((res) => res.data);
    },
    getCustomers: () => {
      return axios
        .get("http://localhost:3000/customers")
        .then((res) => res.data);
    },
  },
  Mutation: {
    deleteCustomer: (_, args) => {
      return axios
        .delete("http://localhost:3000/customers/" + args.id)
        .then((res) => res.data);
    },
    addCustomer: (_, args) => {
      return axios
        .post("http://localhost:3000/customers", {
          name: args.name,
          email: args.email,
          age: args.age,
        })
        .then((res) => res.data);
    },
    editCustomer: (_, args) => {
      return axios
        .patch("http://localhost:3000/customers/" + args.id, args)
        .then((res) => res.data);
    },
  },
};

module.exports = { typeDefs, resolvers };
