import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseSummary } from '../../components/ExpenseSummary'

test('should render expense summary correctly for 1 expense', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={500} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render expense summary correctly for multiple expenses', () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={2} expensesTotal={9620}/>)
    expect(wrapper).toMatchSnapshot()
})