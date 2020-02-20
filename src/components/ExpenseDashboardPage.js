import React from 'react'
import ExpenseList from './ExpenseList'
import ExpensesListFilters from './ExpensesListFilters'
import ExpenseSummary from './ExpenseSummary'

const ExpenseDashboardPage = () => (
    <div>
        <ExpenseSummary />
        <ExpensesListFilters />
        <ExpenseList />
    </div>
)

export default ExpenseDashboardPage