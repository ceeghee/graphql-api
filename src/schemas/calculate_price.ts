import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
	  calculatePrice(type: String!, margin: Float!, exchangeRate: Float!): Float!
  }


`;
