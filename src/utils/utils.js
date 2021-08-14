import _ from 'lodash'
import moment from 'moment'

export function formatCount(number){
    if(isNaN(number)){return number}
    return number>10000?`${(number/10000).toFixed(1)}万`:number
}

export function firstDate(dates){
	if (dates){
		let today = moment().format('YYYY-MM-DD')
		let oldDates = dates
		dates = dates.filter((date)=>{
			return date>=today
		})
		dates = dates.sort()
		return (dates.length > 0) ? dates[0] : null
	}else{
		return null
	}
}
export function lastDate(dates){
	if (dates){
		let today = moment().format('YYYY-MM-DD')
		dates = dates.filter((date)=>{
			return date<=today
		})
		dates = dates.sort()
		return (dates.length > 0) ? dates[0] : null
	}else{
		return null
	}
}

export function formatRMB(value){
	if (value >= 0){
		return `￥${value/100}`
	}else{
		return `-￥${Math.abs(value)/100}`
	}
}