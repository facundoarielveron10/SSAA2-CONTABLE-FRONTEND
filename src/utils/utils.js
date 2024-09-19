export const hasChanges = (newData, originalData) => {
    return !Object.entries(newData).every(([key, value]) => {
        if (key === "role") {
            return value === originalData.role.name;
        }

        return value === originalData[key];
    });
};
