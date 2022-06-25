// validate user name
function validateUserName(userName) {
    let regex = /^[a-zA-Z0-9\s]{1,20}$/gm;
    let result = regex.test(userName);
    return result
}

// validate user email
function validateUserEmail(userEmail) {
    let regex = /^[a-z0-9-_]{1,25}\@[a-z]{5,7}\.(com)$/gm;
    let result = regex.test(userEmail);
    return result
}

// validate user phone
function validateUserPhone(userPhone) {
    let regex = /^(002)?01(0|1|2|5)[0-9]{8}$/gm;
    let result = regex.test(userPhone);
    return result
}

// validate user age
function validateUserAge(userAge) {
    let regex = /^[2-4][0-9]$|^50$/gm;
    let result = regex.test(userAge);
    return result
}

// validate user pasword
function validateUserPassword(userPassword) {
    let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/gm;
    let result = regex.test(userPassword);
    return result
}

// validate repasword
function validateRePassword(userPassword, reUserPassword) {
    if (userPassword === reUserPassword) {
        return true
    }
}

export {
    validateUserName,
    validateUserEmail,
    validateUserPhone,
    validateUserAge,
    validateUserPassword,
    validateRePassword
};