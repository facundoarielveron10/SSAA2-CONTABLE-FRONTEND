// FUNTIONS
export const isGetUsers = (actions) => {
    if (actions.includes("GET_USERS")) {
        return true;
    } else {
        return false;
    }
};

export const isChangeRol = (actions) => {
    if (actions.includes("CHANGE_ROL")) {
        return true;
    } else {
        return false;
    }
};
