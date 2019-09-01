import request from "request-promise";

export const calculatePrice = async(
	type: string,
	margin: number,
	exchangeRate: number
) => {
		const btc_usd_rate = await getExchangeRate();
		const priceMargin = await getPriceMargin(type, margin, btc_usd_rate);

		const ngnPrice: number = exchangeRate * priceMargin;
		return Number(ngnPrice.toFixed(2));
};

export const getExchangeRate = async(): Promise<number> => {
	const price = await request("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
	const parsedPrice = JSON.parse(price);
	const btc_usd_rate = parsedPrice.bpi.USD.rate_float;

	return btc_usd_rate;
};

export const getPriceMargin = async(
	type: string,
	margin: number,
	btc_usd_rate: number
): Promise<number> => {

		const computedMargin: number = margin / 100;

		const computedValue = computedMargin * btc_usd_rate;

		let result = 0;
		switch (type) {
			case "buy":
				result = btc_usd_rate + computedValue;
				break;
			case "sell":
				result = btc_usd_rate - computedValue;
			default:
				break;
		}
		return Number(result.toFixed(2));
};