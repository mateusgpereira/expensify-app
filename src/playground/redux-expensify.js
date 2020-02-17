import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

//Action Generators
// Expenses
const addExpense = ({ description = '', note = '', amount = 0, createAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createAt
    }
})

const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// Filters

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
})

//Expenses Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default:
            return state
    }
}

//Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state
    }
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())
        const startDateMatch = typeof startDate !== 'number' || expense.createAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createAt <= endDate

        return startDateMatch && endDateMatch && textMatch
    }).sort((a,b) => {
        if(sortBy === 'date') {
            return a.createAt < b.createAt ? 1 : -1
        }
        if(sortBy === 'amount'){
            return a.amount > b.amount ? -1 : 1
        }
    })
}


const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createAt: 1000 }))

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createAt: -1000 }))

const expenseThree = store.dispatch(addExpense({ description: 'Car Rent', amount: 1000, createAt: 5000 }))

store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

store.dispatch(sortByAmount())

// store.dispatch(setTextFilter('rent'))

const demoState = {
    expenses: [{
        id: 'd7d7d7dd',
        description: 'Pay Rent',
        amount: 54500,
        note: 'This was the final payment for this apartment',
        createAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}