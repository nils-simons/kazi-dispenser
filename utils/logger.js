var colors = require('colors');

colors.enable()

function log(type, text) {
    if (type.toLowerCase() == 'error') {
        console.log(`[${type.toUpperCase()}] [${getCurrentDateTime()}]: ${text}`.brightRed);
        return
    }
    if (type.toLowerCase() == 'system') {
        console.log(`[${type.toUpperCase()}] [${getCurrentDateTime()}]: ${text}`.brightYellow);
        return
    }
    if (type.toLowerCase() == 'info') {
        console.log(`[${type.toUpperCase()}] [${getCurrentDateTime()}]: ${text}`.brightBlue);
        return
    }
    if (type.toLowerCase() == 'success') {
        console.log(`[${type.toUpperCase()}] [${getCurrentDateTime()}]: ${text}`.brightGreen);
        return
    }
    console.log(`[${type.toUpperCase()}] [${getCurrentDateTime()}]: ${text}`);

    return
}

exports.log = log

function getCurrentDateTime() {
    const now = new Date();
  
    // Get the date components
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
  
    // Get the time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Format the date and time
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
}