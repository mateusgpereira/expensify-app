import React from 'react'
import { Link } from 'react-router-dom'

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
    <div>
        <Link to={`/edit/${id}`}><p>{description}</p></Link>
        <p>{amount}</p>
        <p>{createdAt}</p>
    </div>
)

export default ExpenseListItem