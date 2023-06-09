import moment from 'moment';

export function toBrDate(date) {
    return moment(date).format('DD/MM/YYYY');
}

export function toHour(date) {
    // return moment(date).startOf('hour').fromNow()
    return moment(date).format('HH:mm:ss');
}

export function toHourStart(date) {
    return moment(date).startOf('hour').fromNow('a')
}
