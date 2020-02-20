import React from 'react'
import { connect } from 'react-redux'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'

export const ExpenseSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = (expenseCount.length === 1) ? 'expense' : 'expenses'
    const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00')
    return (
        <div>
            <h2>Viewing {expenseCount} {expenseWord} totalling {formattedTotal}.</h2>
        </div>
    )
}

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpenseSummary)