import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { removeExpense, editExpense, addExpense, startAddExpense, setExpenses, startSetExpenses } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureStore([thunk])

beforeEach((done) => {
    const expenseData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, amount, note, createdAt }
    })
    database.ref('expenses').set(expenseData).then(() => done())
})

test('should setup remove expense action object', () => {
    const removeAction = removeExpense({ id: '123abc' })
    expect(removeAction).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should setup edit expense action object', () => {
    const editAction = editExpense('123abc', { note: 'New value' })
    expect(editAction).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New value'
        }
    })
})

test('should setup add expense action object with provided values', () => {
    const addAction = addExpense(expenses[2])
    expect(addAction).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({})
    const expenseData = { description: 'MI9', note: 'best phone ever', amount: 1600, createdAt: 2000 }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })

        return database.ref(`expenses/${actions[0].expense.id}`).once('value')

    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('should add expense with default values to database and store', (done) => {
    const store = createMockStore({})
    const expenseDefaultData = { description: '', amount: 0, note: '', createdAt: 0 }

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaultData
            }
        })

        return database.ref(`expenses/${actions[0].expense.id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaultData)
        done()
    })
})

test('should setup set expenses action object with values', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({})

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done()
    })
})