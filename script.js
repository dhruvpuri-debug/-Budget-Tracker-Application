const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const category = document.getElementById("category");

const addBtn = document.getElementById("add-btn");
const transactionList =
  document.getElementById("transaction-list");

const incomeEl =
  document.getElementById("income");

const expenseEl =
  document.getElementById("expense");

const balanceEl =
  document.getElementById("balance");

let transactions =
  JSON.parse(localStorage.getItem("transactions"))
  || [];

// Save data
function saveData() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

// Show transactions
function renderTransactions() {

  transactionList.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((item, index) => {

    if (item.type === "income") {
      income += item.amount;
    } else {
      expense += item.amount;
    }

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="info">
        <span class="title">
          ${item.title}
        </span>

        <span class="category">
          ${item.category}
          (${item.type})
          - ₹${item.amount}
        </span>
      </div>

      <button
        class="delete-btn"
        onclick="deleteTransaction(${index})">
        Delete
      </button>
    `;

    transactionList.appendChild(li);
  });

  incomeEl.textContent = income;
  expenseEl.textContent = expense;
  balanceEl.textContent =
    income - expense;
}

// Add transaction
function addTransaction() {

  const titleValue =
    title.value.trim();

  const amountValue =
    Number(amount.value);

  const typeValue =
    type.value;

  const categoryValue =
    category.value;

  if (
    !titleValue ||
    !amountValue ||
    !typeValue ||
    !categoryValue
  ) {
    alert("Please fill all fields");
    return;
  }

  transactions.push({
    title: titleValue,
    amount: amountValue,
    type: typeValue,
    category: categoryValue
  });

  saveData();
  renderTransactions();

  title.value = "";
  amount.value = "";
  type.value = "";
  category.value = "";
}

// Delete transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveData();
  renderTransactions();
}

addBtn.addEventListener(
  "click",
  addTransaction
);

renderTransactions();