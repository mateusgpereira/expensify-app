import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should set up the default values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual([])
})

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-50'
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'honda cb 300',
        amount: 590000,
        note: '',
        createdAt: moment(0).add(15, 'days').valueOf()
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
})

test('should edit an expense', () => {
    const updates = {
        amount: 109700,
        description: 'New Rent'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state[1]).toEqual({ ...expenses[1], ...updates })
})

test('should not edit an non existent expense', () => {
    const updates = {
        amount: 109700,
        description: 'New Rent'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-69',
        updates
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})