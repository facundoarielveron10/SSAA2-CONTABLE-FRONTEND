export const formatBalance = (balance) => {
    if (balance) {
        return balance.toLocaleString("es-ES");
    }

    return balance;
};

export const formatDate = (date) => {
    const dateFormat = new Date(date);

    const day = String(dateFormat.getDate()).padStart(2, "0");
    const month = String(dateFormat.getMonth() + 1).padStart(2, "0");
    const year = dateFormat.getFullYear();

    const hours = String(dateFormat.getHours()).padStart(2, "0");
    const minutes = String(dateFormat.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}hs`;
};
