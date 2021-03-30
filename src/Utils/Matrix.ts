export default class Matrix {
	private rows: number;

	private columns: number;

	public matrixArr: (string | number | boolean)[][] = []

	constructor(rows: number, column: number) {
		this.rows = rows;
		this.columns = column;

		// fill the matrix with null values
		for (let i = 0; i < this.rows; i++) {
			const arr = new Array(this.columns).fill(null)
			this.matrixArr.push(arr)
		}
	}

	/**
	 * Gets rows count
	 */
	get rowsCount(): number {
		return this.rows
	}

	/**
	 * Gets columns count
	 */
	get columnsCount(): number {
		return this.columns
	}

	/**
	 * Randoms fill matrix
	 * @param values
	 */
	public randomFillMatrix(values: number[] | string[] | boolean[]): void {
		for (let i = 0; i < this.rows; i++) {
			this.randomFillMatrixRow(values, i)
		}
	}

	/**
	 * Randoms fill matrix row
	 * @param values
	 * @param row
	 */
	public randomFillMatrixRow(values: number[] | string[] | boolean[], row: number) {
		if (!this.matrixArr[row])
			throw new Error(`Matrix->randomFillMatrixRow row ${row} dont exists on matrix to fill it`)

		const filledArr: (string | number | boolean)[] = this.matrixArr[row].map(() => {
			return values[Math.floor(Math.random() * values.length)];
		});
		this.matrixArr[row] = filledArr;
	}
}