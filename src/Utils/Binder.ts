interface IBinds {
	[key: string]: Function
}
export default class Binder {
	private binds: IBinds;
	constructor() {
		this.binds = {}
	}

	/**
	 * Sets binder
	 * @param func 
	 */
	public set(name: string, func: Function): void {
		if (this.binds[name])
			throw new Error(`Binder->Set bind with name ${name} already exists to binder`)
		this.binds[name] = func
	}

	/**
	 * Gets binder
	 * @param func 
	 * @returns get 
	 */
	public get(name: string): any {
		return this.binds[name];
	}

	/**
	 * Removes binder
	 * @param func 
	 */
	public remove(name: string) {
		delete this.binds[name];
	}
}