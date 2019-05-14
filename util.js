const util = (() => {
	function sum(arr) {
		if (arr.length == 0)
			return null;
		return arr.reduce((a, b) => a + b);
	}


	function avg(arr) {
		return sum(arr);
	}

	/**@param {strnum} num
	 * @return number
	 * */
	const int = num => Math.floor(num);

	return { sum, avg, int };
})();


