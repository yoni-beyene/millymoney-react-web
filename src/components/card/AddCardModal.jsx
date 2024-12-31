const AddCardModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          &larr;
        </button>
        <h2>Add New Card</h2>
        <form className="add-card-form">
          <div className="form-row">
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="Card Number" />
            </div>
            <div className="form-group">
              <label>Card Holder Name</label>
              <input type="text" placeholder="Card Holder Name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="text" placeholder="Expiry Date" />
            </div>
            <div className="form-group">
              <label>CVV/CVC</label>
              <input type="text" placeholder="CVV/CVC" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Address Line 1</label>
              <input type="text" placeholder="Address Line 1" />
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input type="text" placeholder="Address Line 2" />
            </div>
          </div>
          <button type="submit" className="save-card-btn">
            Save Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCardModal;
