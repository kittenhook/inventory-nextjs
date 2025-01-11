import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const projectEnv = {
	DATABASE_URL: process.env.DATABASE_URL || "",
};

export default projectEnv;
