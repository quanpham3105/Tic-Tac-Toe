const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const b4 = document.getElementById("b4");
const b5 = document.getElementById("b5");
const b6 = document.getElementById("b6");
const b7 = document.getElementById("b7");
const b8 = document.getElementById("b8");
const b9 = document.getElementById("b9");

let count = 0;

[b1, b2, b3, b4, b5, b6, b7, b8, b9].forEach((button) => {
    button.addEventListener('click', () => {
        if (button.value == "") {
            if (count % 2 == 0) {
                button.value = "X"
                count++;
            }
            else {
                button.value = "Y";
                count++;
            }
        }
    });
});
