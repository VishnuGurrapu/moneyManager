// Write your code here
// Write your code here
import './index.css'
const MoneyDetails = props => {
  const {userBalance, userIncome, userExpenses} = props
  return (
    <div className="moneyDetailsContainer">
      <div className="moneyDetail1 moneyDetailItem">
        <img
          className="img"
          alt="balance"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        />
        <div className="itemContainer">
          <p className="text">Your Balance</p>
          <p data-testid="balanceAmount" className="inRupees">
            Rs {userBalance}
          </p>
        </div>
      </div>
      <div className="moneyDetail2 moneyDetailItem">
        <img
          className="img"
          alt="income"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div className="itemContainer">
          <p className="text">Your Income</p>
          <p data-testid="incomeAmount" className="inRupees">
            Rs {userIncome}
          </p>
        </div>
      </div>
      <div className="moneyDetail3 moneyDetailItem">
        <img
          className="img"
          alt="expenses"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div className="itemContainer">
          <p className="text">Your Expenses</p>
          <p data-testid="expensesAmount" className="inRupees">
            Rs {userExpenses}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
