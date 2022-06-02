const showDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const showAge = (date) => {

    var date2 = new Date();
    var diff = new Date(date2.getTime() - date.getTime());
    // diff is: Thu Jul 05 1973 04:00:00 GMT+0300 (EEST)

    let yearString = "";
    if (diff.getUTCFullYear() - 1970 == 1) {
        yearString = diff.getUTCFullYear() - 1970 + " year"
    } else {
        yearString = diff.getUTCFullYear() - 1970 + " years"
    }
    let monthString = ""
    if (diff.getUTCMonth() == 1) {
        monthString = diff.getMonth() + " month"
    } else {
        monthString = diff.getMonth() + " months"
    }

    return `${yearString} and ${monthString}`


// console.log(diff.getUTCFullYear() - 1970); // Gives difference as year
// // 3

// console.log(diff.getUTCMonth()); // Gives month count of difference
// // 6

// console.log(diff.getUTCDate() - 1); // Gives day count of difference 
}

export { showDate, showAge }

