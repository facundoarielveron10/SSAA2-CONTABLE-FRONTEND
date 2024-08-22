export const errorResponse = (error) => {
    if (error.response.data.errors[0].msg) {
        return error.response.data.errors[0].msg;
    } else if (error.response.data.errors) {
        return error.response.data.errors;
    } else {
        return error.response.data.error;
    }
};
