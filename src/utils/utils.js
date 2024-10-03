export const haveArraysChanged = (originalArray, editedArray) => {
    if (originalArray.length !== editedArray.length) {
        return true;
    }

    const originalSorted = [...originalArray].sort();
    const editedSorted = [...editedArray].sort();

    for (let i = 0; i < originalSorted.length; i++) {
        if (originalSorted[i] !== editedSorted[i]) {
            return true;
        }
    }

    return false;
};

export const generateID = () => {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < 5; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
};
