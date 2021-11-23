export default {
	format: function (item, val) {
		const auxiliaryUnitId = item.auxiliaryUnitId
		const basicUnitId = item.basicUnitId
		const basicUnitName = item.basicUnitName
		const auxiliaryUnitName = item.auxiliaryUnitName
		const unitConvertRatio = item.unitConvertRatio
		// 辅助单位有效
		if (auxiliaryUnitId && auxiliaryUnitName && unitConvertRatio) {
			// 把总数对 换算比 求余数
			const tempValue = Math.abs(val)
			const m = tempValue % unitConvertRatio
			const b = Math.floor(tempValue / unitConvertRatio)
			let str = val < 0 ? '-' : ''
			if (b !== 0) {
				str += b + '' + auxiliaryUnitName
			}
			if (m !== 0 || b === 0) {
				str += m + '' + basicUnitName
			}
			return str
		}
		if (basicUnitId && basicUnitName) { return val + '' + basicUnitName }
		return val
	},
	toBase: function (item, unit, val) {
		if (item && unit && val) {
			const unitConvertRatio = item.unitConvertRatio
			if (unit.toString() === item.basicUnitId.toString()) {
				return val
			}
			return val * unitConvertRatio
		}
		return val
	}
}
