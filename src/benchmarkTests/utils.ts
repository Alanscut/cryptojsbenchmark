export function randomString(length: number) {
    var str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i) {
        result += str[Math.floor(Math.random() * str.length)];
    }

    return result;
}