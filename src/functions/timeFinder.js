const timeFinder = (time) => {
    let currentTime = new Date();
    let postTime = new Date(time);
    if (currentTime.getDate() === postTime.getDate() && currentTime.getFullYear() === postTime.getFullYear() && currentTime.getMonth() === postTime.getMonth()) {
        if (currentTime.getHours() === postTime.getHours()) {
            if (currentTime.getTime() - postTime.getTime() < 60000) {
                return Math.round((currentTime.getTime() - postTime.getTime()) / 1000) + 's'
            } else {
                return Math.round((currentTime.getTime() - postTime.getTime()) / 1000 / 60).toString() + 'm'
            }
        } else {
            return (Math.round((currentTime.getTime() - postTime.getTime()) / 1000 / 60 / 60) || 1).toString() + 'h'
        }
    } else if (currentTime.getFullYear() === postTime.getFullYear()) {
        if (currentTime.getTime() - postTime.getTime() < 604800000) {
            return (Math.round((currentTime.getTime() - postTime.getTime()) / 1000 / 60 / 60 / 24) || 1).toString() + 'd'
        } else {
            return postTime.toLocaleString('en-US', { month: 'short', day: 'numeric' })
        }
    } else {
        return postTime.toLocaleString('en-US', {timeZone: 'America/Los_Angeles', month: 'short', day: 'numeric', year: 'numeric' })
    }
}
export default timeFinder