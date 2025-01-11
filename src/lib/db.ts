import { Pool } from "pg";
import * as schema from "./schema";
import projectEnv from "./config";
// import { drizzle as mssql_drizzle } from "drizzle-orm/node-mssql";
import { drizzle as postgre_drizzle } from "drizzle-orm/node-postgres";
// import { ConnectionPool } from "mssql";

// const sqlServerPool = new ConnectionPool({
// 	user: "sa",
// 	password: "12345",
// 	server: projectEnv.DATABASE_URL!,
// 	database: "db",
// 	options: {
// 		encrypt: false,
// 		enableArithAbort: true,
// 	},
// });

export const postgrePool = new Pool({
	connectionString: projectEnv.DATABASE_URL,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

// export const mssqlDb = mssql_drizzle(sqlServerPool, { schema, logger: true });
export const db = postgre_drizzle(postgrePool, {
	schema,
	logger: true,
});
