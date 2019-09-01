import { combineResolvers } from "graphql-resolvers";
import { calculatePrice } from "../controllers/calculate_price";

export default {

	Query: {
		calculatePrice: async(
			parent,
			{type, margin, exchangeRate},
			{}
		) => {
				const inputType = type.buyorsel;
				return await calculatePrice(inputType, margin, exchangeRate);
		}
	}
};