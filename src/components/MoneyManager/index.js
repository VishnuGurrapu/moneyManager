import {Component} from 'react'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

import {v4 as uuidv4} from 'uuid'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '', // Potential Issue: amount should be handled carefully due to type conversion
    type: transactionTypeOptions[0].optionId,
    historyList: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value}) // Potential Issue: Consider converting this to a number here
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {title, amount, type, historyList} = this.state

    if (title && amount && type) {
      const newTransaction = {
        id: uuidv4(), // Unique ID for each transaction
        title,
        amount: parseFloat(amount), // Correction: Convert amount to a number earlier in state handling
        type,
      }

      const updatedHistoryList = [...historyList, newTransaction]
      let newIncome = this.state.income
      let newExpenses = this.state.expenses
      let newBalance = this.state.balance

      // Update the income, expenses, and balance based on transaction type
      if (type === 'INCOME') {
        newIncome += parseFloat(amount)
        newBalance += parseFloat(amount)
      } else if (type === 'EXPENSES') {
        newExpenses += parseFloat(amount)
        newBalance -= parseFloat(amount)
      }

      // Update the state with the new transaction and calculated values
      this.setState({
        historyList: updatedHistoryList,
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId, // Reset type to default
        balance: newBalance,
        income: newIncome,
        expenses: newExpenses,
      })
    }
  }

  deleteItem = id => {
    const {historyList} = this.state

    const filteredUsersData = historyList.filter(each => each.id !== id)
    let newIncome = this.state.income
    let newExpenses = this.state.expenses
    let newBalance = this.state.balance

    historyList.forEach(transaction => {
      if (transaction.id === id) {
        if (transaction.type === 'INCOME') {
          newIncome -= transaction.amount
          newBalance -= transaction.amount
        } else {
          newExpenses -= transaction.amount
          newBalance += transaction.amount
        }
      }
    })

    this.setState({
      historyList: filteredUsersData,
      balance: newBalance,
      income: newIncome,
      expenses: newExpenses,
    })
  }

  render() {
    const {type, amount, title, balance, income, expenses, historyList} =
      this.state
    return (
      <div className="bgContainer">
        <div className="introContainer">
          <p className="name">Hi, Richard</p>
          <p className="intro">
            Welcome back to your{' '}
            <span className="moneyManager">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          userBalance={balance}
          userIncome={income}
          userExpenses={expenses}
        />

        <div className="transactionAndHistoryContainer">
          <div className="formContainer">
            <h1 className="heading">Add Transaction</h1>
            <form className="contact-form-container" onSubmit={this.onAdd}>
              <label className="Label" htmlFor="title">
                TITLE
              </label>
              <br />
              <input
                id="title"
                value={title}
                onChange={this.onChangeTitle}
                className="input"
                placeholder="TITLE"
                type="text"
              />
              <br />
              <label className="Label" htmlFor="amount">
                AMOUNT
              </label>
              <br />
              <input
                id="amount"
                className="input"
                value={amount}
                onChange={this.onChangeAmount}
                placeholder="AMOUNT"
                type="text"
              />
              <br />
              <label className="Label" htmlFor="type">
                TYPE
              </label>
              <br />
              <select
                value={type}
                onChange={this.onChangeType}
                className="input"
                id="type"
              >
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
          <div className="history-table">
            <h1 className="heading">History</h1>
            <ul className="history">
              <li className="table-header">
                <p className="table-header-cell name-column">TITLE</p>

                <p className="table-header-cell name-column">AMOUNT</p>

                <p className="table-header-cell last-column">TYPE</p>
              </li>
              {historyList.map(each => (
                <TransactionItem
                  key={each.id}
                  deleteItem={this.deleteItem}
                  itemDetails={each}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
