import { removeExpense, editExpense, addExpense } from '../../actions/expenses'

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
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 293999494949494,
        note: 'last month rent'
    }
    const addAction = addExpense(expenseData)
    expect(addAction).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
})

test('should setup add expense object with default values', () => {
    const addAction = addExpense({})
    expect(addAction).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        }
    })
})