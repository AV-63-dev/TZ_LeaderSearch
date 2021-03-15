import regeneratorRuntime from "regenerator-runtime";

export const sorter = (arr) => {
    return arr.concat().filter(item => item.click);
}

export const random = (maxNum, minNum = 0) => minNum + Math.floor(Math.random() * (maxNum - minNum + 1));

export async function send(formData) {
    const response = fetch("/public/send.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .catch(() => alert('ERROR feth => php'));

    return response;
}