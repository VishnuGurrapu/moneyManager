// Write your code here
import './index.css'

const TransactionItem = props => {
  const {deleteItem, itemDetails} = props
  const {id, title, type, amount} = itemDetails
  const deleteItemBtn = () => {
    deleteItem(id)
  }

  return (
    <li className="table-row">
      <div className="table-cell name-column">
        <p>{title}</p>
      </div>

      <div className="table-cell name-column">
        <p className="mobile-no-value">Rs {amount}</p>
      </div>

      <div className="table-cell last-column">
        <p className="mobile-no-value">{type}</p>

        <button
        data-testid="delete"
          className="delete-icon-container name-column"
          onClick={deleteItemBtn}
        >
          <img
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
