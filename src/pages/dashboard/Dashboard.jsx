import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <ul className="menu">
          <li className="menu-item active">
            <i className="bi bi-house-door"></i> Home
          </li>
          <li className="menu-item">
            <i className="bi bi-bar-chart"></i> Statistics
          </li>
          <li className="menu-item">
            <i className="bi bi-people"></i> Recipient
          </li>
          <li className="menu-item">
            <i className="bi bi-credit-card"></i> Cards
          </li>
          <li className="menu-item">
            <i className="bi bi-person"></i> Profile
          </li>
        </ul>
        <div className="logout">
          <i className="bi bi-box-arrow-left"></i> Logout
        </div>
      </aside>
      <main className="content">
        <header className="header">
          <div>
            <h5>Good morning 👋</h5>
            <h2>Sheldon Cooper</h2>
          </div>
          <i className="bi bi-bell"></i>
        </header>
        <section className="amount-section">
          <div className="amount-input">
            <input type="text" placeholder="Amount" />
            <div className="currency">
              <img src="https://flagcdn.com/us.svg" alt="USD" /> USD
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
          <button className="btn btn-primary">Send Money</button>
        </section>
        <section className="actions-section">
          <h5>Suggestion Actions</h5>
          <div className="actions">
            <div className="action-item">
              <i className="bi bi-plus"></i> Add
            </div>
            <div className="action-item">
              <i className="bi bi-send"></i> Send
            </div>
            <div className="action-item">
              <i className="bi bi-download"></i> Receive
            </div>
            <div className="action-item">
              <i className="bi bi-arrow-left-right"></i> History
            </div>
          </div>
        </section>
        <section className="transactions-section">
          <h5>Transaction</h5>
          <div className="transactions">
            <div className="transaction-item">
              <i className="bi bi-arrow-up-right"></i>
              <div>
                <p>Transfer to Leonard H.</p>
                <span>05:15 PM</span>
              </div>
              <p className="amount">$160</p>
            </div>
            <div className="transaction-item">
              <i className="bi bi-arrow-down-left"></i>
              <div>
                <p>Receive from Penny</p>
                <span>04:43 PM</span>
              </div>
              <p className="amount">$45</p>
            </div>
          </div>
          <a href="#" className="view-all">
            View All
          </a>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
