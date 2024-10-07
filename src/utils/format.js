export const formatBalance = (balance) => {
    return balance.toLocaleString("es-ES");
};

export const formatDate = (date) => {
    const dateFormat = new Date(date);
    const day = String(dateFormat.getDate()).padStart(2, "0");
    const month = String(dateFormat.getMonth() + 1).padStart(2, "0");
    const year = dateFormat.getFullYear();

    return `${day}/${month}/${year}`;
};
