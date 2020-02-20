const selectExpensesTotal = (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, amount) => sum + amount, 0)
}

export default selectExpensesTotal