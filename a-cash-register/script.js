// 定义商品价格和现金抽屉
let price = 19.5; // 商品价格
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 1]
];

// 获取HTML元素
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

// 货币面值及其转换
const currencyValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

function calculateChange(price, cash, cid) {
    let changeDue = cash - price; // 应付零钱
    let change = [];

    // 现金抽屉的总额
    let totalCid = cid.reduce((total, coin) => total + coin[1], 0);

    // 如果找零大于现金抽屉中的现金或者找零金额为负数
    if (changeDue > totalCid || changeDue < 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    // 当现金抽屉的总金额刚好等于应付零钱时，输出 Status: CLOSED
    if (changeDue === totalCid) {
        return "Status: CLOSED " + cid
            .filter(coin => coin[1] > 0) // 过滤掉金额为0的面额
            .sort((a, b) => currencyValues[b[0]] - currencyValues[a[0]]) // 按金额从高到低排序
            .map(coin => `${coin[0]}: $${coin[1].toFixed(2)}`) // 格式化金额
            .join(" "); // 用空格连接
    }

    // 遍历每种货币，尽可能提供找零
    for (let i = cid.length - 1; i >= 0; i--) {
        let coinName = cid[i][0];
        let coinAmount = cid[i][1];
        let coinValue = currencyValues[coinName];

        let changeForThisCoin = 0;

        // 计算能够返回多少该面值的硬币
        while (changeDue >= coinValue && coinAmount > 0) {
            changeDue -= coinValue;
            changeDue = parseFloat(changeDue.toFixed(2)); // 处理浮动精度
            coinAmount -= coinValue;
            changeForThisCoin += coinValue;
        }

        if (changeForThisCoin > 0) {
            change.push([coinName, changeForThisCoin]);
        }
    }

    // 如果找零金额仍然大于零，说明找零失败
    if (changeDue > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    // 返回找零的情况，按照面额从大到小排序
    return "Status: OPEN " + change
        .sort((a, b) => currencyValues[b[0]] - currencyValues[a[0]]) // 按照货币面额从大到小排序
        .map(coin => `${coin[0]}: $${coin[1].toFixed(2)}`).join(" ");
}

// 点击购买按钮时执行
purchaseBtn.addEventListener("click", function () {
    let cash = parseFloat(cashInput.value);

    if (isNaN(cash)) {
        alert("Please enter a valid amount.");
        return;
    }

    // 如果顾客提供的现金不足
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    // 如果现金金额与商品价格相同，直接显示精确支付
    if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }

    // 如果现金金额大于商品价格
    if (cash > price) {
        let result = calculateChange(price, cash, cid);
        let changeDueValue = cash - price;
        let totalCid = cid.reduce((total, coin) => total + coin[1], 0);

        // 检查是否正好匹配 "Status: CLOSED" 的条件
        if (changeDueValue === totalCid) {
            changeDue.textContent = "Status: CLOSED " + cid
                .filter(coin => coin[1] > 0) // 过滤掉金额为0的面额
                .sort((a, b) => currencyValues[b[0]] - currencyValues[a[0]]) // 按金额从高到低排序
                .map(coin => `${coin[0]}: $${coin[1].toFixed(2)}`) // 格式化金额
                .join(" "); // 用空格连接
        } else {
            // 输出正常找零的状态
            changeDue.textContent = result;
        }
        return;
    }
});
