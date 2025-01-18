import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const projectEnv = {
	DATABASE_URL: process.env.DATABASE_URL || "",
	WEB_URL: process.env.WEB_URL || "localhost:3000",
};

export default projectEnv;
