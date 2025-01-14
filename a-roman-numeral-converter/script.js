document.getElementById('convert-btn').addEventListener('click', function () {
    const numberInput = document.getElementById('number').value;
    const output = document.getElementById('output');

    if (!numberInput) {
        output.textContent = "Please enter a valid number";
        output.classList.remove('success');
        output.classList.add('error');
        return;
    }

    const number = parseInt(numberInput);

    if (number < 1) {
        output.textContent = "Please enter a number greater than or equal to 1";
        output.classList.remove('success');
        output.classList.add('error');
        return;
    }

    if (number > 3999) {
        output.textContent = "Please enter a number less than or equal to 3999";
        output.classList.remove('success');
        output.classList.add('error');
        return;
    }

    const romanNumeral = convertToRoman(number);
    output.textContent = romanNumeral;
    output.classList.remove('error');
    output.classList.add('success');
});

function convertToRoman(num) {
    const romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];

    let result = "";

    for (const [roman, value] of romanNumerals) {
        while (num >= value) {
            result += roman;
            num -= value;
        }
    }

    return result;
}
