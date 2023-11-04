export const SuccessReponse = (data) => {
    return {
        status: 200,
        message: "User retrieved successfull",
        data: data,
    }
}

export const ErrorReponse = (message) => {
    return {
        status: 400,
        message: message,
        data: "",
    }
}

