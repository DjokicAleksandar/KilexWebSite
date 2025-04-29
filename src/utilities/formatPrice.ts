export function formatPrice(number: number) {
    return number.toLocaleString("sr-RS", {
        style: "currency",
        currency: "RSD",
        currencyDisplay: "symbol"
    }).replace("RSD", "").trim() + " RSD";
}