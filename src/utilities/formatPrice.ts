export function formatPrice(number: number) {
    return (number.toLocaleString("sr-RS", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: "currency",
        currency: "RSD",
        currencyDisplay: "symbol"
    }).replace("RSD", "").trim() + " RSD");
}