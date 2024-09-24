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
