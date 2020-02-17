import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test('should setup default values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'})
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate:  moment().endOf('month')
    })
})

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'})
    expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
    const currentState = {
        sortBy: 'amount'
    }
    const state = filtersReducer(currentState, { type: 'SORT_BY_DATE'})
    expect(state.sortBy).toBe('date')
})

test('should set textFilter', () => {
    const text = 'us guri'
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(undefined, action)
    expect(state.text).toBe(text)
})

test('should set startDate', () => {
    const startDate = moment().subtract(1, 'months')
    const action = {
        type: 'SET_START_DATE',
        startDate
    }
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toBe(startDate)
})

test('should set endDate', () => {
    const endDate = moment().add(6, 'days')
    const action = {
        type: 'SET_END_DATE',
        endDate
    }
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toBe(endDate)
})