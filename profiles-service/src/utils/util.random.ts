export class Random {
	private static numb: number

	constructor() {
		Random.numb = Math.floor((Math.random() * 1000) / 60)
		Random.set(Random.numb)
	}

	static get(): number {
		return this.numb
	}

	private static set(numb: number): void {
		this.numb = numb
	}
}

new Random()
