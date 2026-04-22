const USD_TO_PKR = 278;

export const toPKR = (usd: number): string => {
    return `Rs ${Math.round(usd * USD_TO_PKR).toLocaleString()}`;
};
