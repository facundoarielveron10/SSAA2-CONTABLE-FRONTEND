export const errorResponse = (error) => {
    if (error?.response?.data?.errors[0]?.msg) {
        return error?.response?.data?.errors[0]?.msg;
    } else if (error?.response?.data?.errors) {
        return error?.response?.data?.errors;
    } else if (error?.response?.data?.error) {
        return error?.response?.data?.error;
    } else {
        console.error(error);
        return "Hubo un error, recargue y vuelva a intentar";
    }
};
