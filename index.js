/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return { firstName: firstName, familyName: familyName, title: title, payPerHour: payPerHour, timeInEvents: [], timeOutEvents: [] }
}

let createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map(array => createEmployeeRecord(array))
}

let createTimeInEvent = function(dateStamp){
    let dateStampSplit = dateStamp.split(" ")
    this.timeInEvents.push({ type: "TimeIn", hour: parseInt(dateStampSplit[1]), date: dateStampSplit[0] })
    return this
}

let createTimeOutEvent = function(dateStamp){
    let dateStampSplit = dateStamp.split(" ")
    this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(dateStampSplit[1]), date: dateStampSplit[0] })
    return this
}

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(timeInObj => timeInObj.date === date)
    let timeOut = this.timeOutEvents.find(timeInObj => timeInObj.date === date)
    timeIn = timeIn.hour
    timeOut = timeOut.hour
    let hourIn = parseInt((''+timeIn).slice(0, -2))
    let hourOut = parseInt((''+timeOut).slice(0, -2))
    return hourOut - hourIn
}

let wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

// let allWagesFor = () => { 
//     let arrayOfDates = this.timeInEvents.map(dateObj => dateObj.date)
//     let allWagesEarned = arrayOfDates.map(date => wagesEarnedOnDate.call(this, date))
//     return allWagesEarned.reduce((total, currentValue) => total + currentValue)
// }

let findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(array => array.firstName === firstName)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let calculatePayroll = function(srcArray){ 
    let totalWagesArray = srcArray.map(obj => allWagesFor.call(obj))
    let grandTotal = totalWagesArray.reduce((total, currentValue) => total + currentValue) 
    return grandTotal
}