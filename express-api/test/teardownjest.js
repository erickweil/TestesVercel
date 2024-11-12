export default async function teardownJest() {
	await globalThis.__MONGOD__.stop();
}
