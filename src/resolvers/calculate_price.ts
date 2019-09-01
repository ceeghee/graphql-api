import { combineResolvers } from "graphql-resolvers";
import { calculatePrice } from "../controllers/calculate_price";

export default {

	Query: {
		calculatePrice: async(
			parent,
			{type, margin, exchangeRate},
			{}
		) => {
				return await calculatePrice(type, margin, exchangeRate);
		}
	}
};