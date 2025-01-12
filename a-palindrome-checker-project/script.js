// 检查是否为回文
function isPalindrome(input) {
    const cleaned = input.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
}

// 主逻辑
document.getElementById('check-btn').addEventListener('click', function () {
    const inputField = document.getElementById('text-input');
    const resultDiv = document.getElementById('result');
    const inputText = inputField.value.trim();

    // 清除结果显示
    resultDiv.style.display = 'none';
    resultDiv.classList.remove('success', 'error');

    // 检测是否为空
    if (!inputText) {
        alert('Please input a value');
        return;
    }

    // 检查是否是回文
    if (isPalindrome(inputText)) {
        resultDiv.textContent = `${inputText} is a palindrome`;
        resultDiv.classList.add('success');
    } else {
        resultDiv.textContent = `${inputText} is not a palindrome`;
        resultDiv.classList.add('error');
    }

    resultDiv.style.display = 'block';
});
