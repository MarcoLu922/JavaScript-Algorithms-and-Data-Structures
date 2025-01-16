document.getElementById("check-btn").addEventListener("click", function () {
    var userInput = document.getElementById("user-input").value.trim();
    var resultDiv = document.getElementById("results-div");

    // 如果没有输入值，显示提示框
    if (!userInput) {
        alert("Please provide a phone number");
        return;
    }

    var phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})(\s?|\-)?\d{3}(\s?|\-)?\d{4}$/;

    if (phoneRegex.test(userInput)) {
        resultDiv.textContent = "Valid US number: " + userInput;
        resultDiv.classList.add('valid');
        resultDiv.classList.remove('invalid');
    } else {
        resultDiv.textContent = "Invalid US number: " + userInput;
        resultDiv.classList.add('invalid');
        resultDiv.classList.remove('valid');
    }
});

document.getElementById("clear-btn").addEventListener("click", function () {
    document.getElementById("results-div").textContent = "";
    document.getElementById("user-input").value = "";
    document.getElementById("results-div").classList.remove('valid', 'invalid');
});
