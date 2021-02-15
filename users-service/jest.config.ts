import { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts'],
	cache: true,
	testMatch: ['<rootDir>/__tests__/**/*.{test.ts,spec.ts}', '<rootDir>/tests/**/*.{test.ts,spec.ts}'],
	testPathIgnorePatterns: [
		'node_modules',
		'dists',
		'.dockerignore',
		'.editorconfig',
		'.env',
		'.eslintignore',
		'.eslintrc',
		'.gitignore',
		'.prettierignore',
		'.prettierrc',
		'companies.mk',
		'Dockerfile.dev',
		'Dockerfile.prod',
		'package.lock.json',
		'package.json',
		'tsconfig.json'
	]
}

export default config
