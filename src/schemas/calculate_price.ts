import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
	  calculatePrice(type: TypeInput!, margin: Float!, exchangeRate: Float!): Float!
  }

  input TypeInput {
	  buyorsel: types!
  }
  enum types{
	  buy
	  sell
  }
`;
