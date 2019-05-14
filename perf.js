/**@example
 for(...) {
   perf.mark('start');
   // do something
   perf.mark('end');
   perf.measure('start', 'end');
 }
 const measures = perf.getMeasures('start', 'end');
 console.log(measures.name, measures.avg());
 > start -> end 48.01234567891011127*/
const perf = (() => {
	/**@param {strnum} markName*/
	function mark(markName) {
		window.performance.mark(markName);
	}

	/**@param {strnum} startMark
	 @param {strnum} endMark*/
	function measure(startMark, endMark) {
		window.performance.measure(`${startMark} -> ${endMark}`, startMark, endMark);
	}

	/**@param {...[strnum]} startEndPairs*/
	function measureMany(...startEndPairs) {
		for (let [start, end] of startEndPairs)
			measure(start, end);
	}

	/**
	 @param {strnum} startMark
	 @param {strnum} endMark
	 @return {PerformanceEntryList}*/
	function getMeasures(startMark, endMark) {
		const name = `${startMark} -> ${endMark}`;
		const measures = window.performance.getEntriesByName(name, 'measure');
		measures.avg = () => util.avg(measures.map(m => m.duration));
		measures.name = name;
		return measures;
	}

	/**@param {...[strnum]} startEndPairs
	 * @return {Array<PerformanceEntryList>}
	 */
	function getManyMeasures(...startEndPairs) {
		const manyMeasures = [];
		for (let [start, end] of startEndPairs)
			manyMeasures.push(getMeasures(start, end));
		return manyMeasures;
	}

	return { measureMany, getManyMeasures, getMeasures, measure, mark };

})();
