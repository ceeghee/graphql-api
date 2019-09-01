import app from "./app";
import { Request, Response, NextFunction } from "express";
import schemas from "./schemas";
import resolvers from "./resolvers";
import jwt from "jsonwebtoken";
const { ApolloServer, AuthenticationError } = require("apollo-server-express");


const server = new ApolloServer({
	typeDefs: schemas,
	resolvers,
	introspection: true,
	playground: true,
	formatError: (error: any) => {
		// remove the internal sequelize error message
		// leave only the important validation error
		const message = error.message
		.replace("SequelizeValidationError: ", "")
		.replace("Validation error: ", "");
		return {
			...error,
			message,
		};
	},
	context: async ({ req, connection }) => {
			if (req) {
			return {
				req,
			};
		}
	},
});

const path = "/graphiql";

server.applyMiddleware({ app, path });


const AppServer = app.listen({ port: app.get("port") }, () =>
	console.log(`🚀 GraphQl Server running at http://localhost:${app.get("port")}` + `${server.graphqlPath}`)
);



export default AppServer;
