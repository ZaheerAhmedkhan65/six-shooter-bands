export function getMin(array) {
    let min = parsePrice(array[0]);
    for (let i = 1; i < array.length; i++) {
        const value = parsePrice(array[i]);
        if (value < min) {
            min = value;
        }
    }
    return formatPrice(min);
}

export function getMax(array) {
    let max = parsePrice(array[0]);
    for (let i = 1; i < array.length; i++) {
        const value = parsePrice(array[i]);
        if (value > max) {
            max = value;
        }
    }
    return formatPrice(max);
}

export function parsePrice(priceStr) {
    return Number(priceStr.replace("RS.", "").replace(/,/g, ""));
}

export function formatPrice(value) {
    return "RS." + value.toLocaleString("en-PK");
}
