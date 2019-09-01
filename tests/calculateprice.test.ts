import server from "../src/server";
import { request } from "graphql-request";
import { host } from "./constants";
import { getExchangeRate, getPriceMargin, calculatePrice } from "../src/controllers/calculate_price";

function sum(a, b) {
	return a + b;
}

const type = "sell";

const margin = 0.5;

const exchangeRate = 350;

beforeAll(async () => {
	const app = await server;
});

afterAll(async () => {
	const app = await server;
	app.close();
})


const query = `
	query calculatePrice($type: String!, $margin: Float!, $exchangeRate: Float!) {
		calculatePrice(type: $type, margin: $margin, exchangeRate: $exchangeRate)
	}
`;

const variables = {
	type: type,
	margin: margin,
	exchangeRate: exchangeRate
};


describe("Calculate Price", async() => {

	it("Gets BTC to USD price from Coindesk", async() => {
		const btc_usd_rate = await getExchangeRate();

		expect(btc_usd_rate).toBeGreaterThan(0);
	});

	it("Calculates the Price Margin ", async() => {
		const btc_usd_rate = await getExchangeRate();

		expect(btc_usd_rate).not.toEqual(null);
		expect(btc_usd_rate).toBeGreaterThan(0);

		const price_margin = await getPriceMargin(type, margin, btc_usd_rate);

		expect(price_margin).toBeGreaterThan(0);

		const buy_type = "buy";
		const buy_price_margin = await getPriceMargin(buy_type, margin, btc_usd_rate);

		expect(buy_price_margin).toBeGreaterThan(0);
		expect(price_margin).toBeLessThan(buy_price_margin);
	});

	it("Calculates Price and Returns Calculation results", async() => {
		const price = await calculatePrice(type, margin, exchangeRate);

		expect(price).toBeGreaterThan(0);
	});


	it("GraphQl query receives calculation results and spits it out", async() => {
		const price = await request(host, query, variables);
		const price_data = price.calculatePrice;

		expect(price_data).toBeGreaterThan(0);
	});
});