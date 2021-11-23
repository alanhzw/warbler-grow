import util from '../util/util.js'
import ItemUtil from '../util/itemUtil.js'

export const status = (value) => {
	switch (value) {
	case  -1:
		return '已删除';
    break;
	case  0:
		return '默认';
    break;
	case  1:
		return '正常';
	break;
	// no default
	}
}

export const visitStatus = (value) => {
	switch (value) {
	case  0:
		return '计划中';
    break;
	case  1:
		return '拜访中';
    break;
	case  2:
		return '已拜访';
	break;
	// no default
	}
}

// 用户状态
export const userStatus = (value) => {
	switch (value) {
	case  1:
		return '试用用户';
    break;
	case  2:
		return '共创用户';
    break;
	case  3:
		return '付费用户';
	break;
	// no default
	}
}

export const price = (value) => {
	if (isNaN(value)) {
		return 0
	}
	return value / 100
}

export const date = (value) => {
	return util.format_date(value)
}

export const datetime = (value, fmt) => {
	return util.format_time(value, fmt)
}

export const getNull = (value) => {
	if ( value === '' || value === null || value === undefined ) {
		return '--'

	} else {
		return value
	}
}

export const approvalStatus = (val) => {
	if (val === 1) {
			return "已审批"
		}
		if (val === 0) {
			return "未审批"
		}
		if (val === -1) {
			return "驳回"
		}
}

export const settleAccountsStatus = (val) => {
	if (val === 1) {
		return "已结算"
	}
	if (val === 0) {
		return "未结算"
	}
}

export const returnType = (val) => {
	if (val === 1) {
		return "退货单"
	  }
	  if (val === 2) {
		return "换货单"
	  }
}

export const unit = (item, val) => {
	return ItemUtil.format(item, val);
}
