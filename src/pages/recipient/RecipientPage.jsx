import { useState, useEffect } from "react";
import RecipientList from "../../components/recipient/RecipientList";
import Header from "../../components/shared/header/Header";
import RecipientDetails from "../../components/recipient/RecipientDetails";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./RecipientPage.scss";
import HTTPService from "../../services/shared/HTTPService";
import LoadingPage from "../../components/shared/loadingPage/LoadingPage";
import PrimaryButton from "../../components/shared/primaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

const RecipientPage = () => {
  const navigate = useNavigate();

  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const senderId = useSelector((state) => state.global.senderId);
  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);

  useEffect(() => {
    HTTPService.post(`/sender/recipient/get-recipient/${senderId}`)
      .then((res) => {
        setFilteredRecipients(res.data.recipients);
        setRecipients(res.data.recipients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = recipients.filter(
      (item) =>
        item.firstName.toLowerCase().includes(query.toLowerCase()) ||
        item.fatherName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipients(filtered);
  };

  const handleRecipientClick = (recipient) => {
    setSelectedRecipient(recipient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipient(null);
  };
  return (
    <div className="home-container">
      <Header activeTab="recipient" />
      {loading ? (
        <LoadingPage />
      ) : (
        <main className="content p-5">
          {showModal ? (
            <RecipientDetails
              handleCloseModal={handleCloseModal}
              selectedRecipient={selectedRecipient}
            />
          ) : (
            <>
              <section className="amount-section d-flex justify-content-between w-100">
                <div
                  className="amount-input-container"
                  style={{ maxWidth: "400px" }}
                >
                  <input
                    type="text"
                    placeholder="Find Recipients"
                    className="amount-input my-2"
                    style={{ maxWidth: "400px" }}
                    onChange={(search) => {
                      handleSearch(search.target.value);
                    }}
                  />
                  <div className="currency">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
                <div style={{ width: "200px" }}>
                  <PrimaryButton
                    text="Add Recipient"
                    onClick={() => navigate("/recipient/add-new")}
                    isLoading={false}
                  />
                </div>
              </section>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <select className="form-select w-auto select-recipient-options">
                  <option value="all">All Recipient</option>
                  <option value="recent">Recently Added</option>
                </select>
              </div>{" "}
              <RecipientList
                recipients={filteredRecipients}
                handleRecipientClick={handleRecipientClick}
              />
            </>
          )}
        </main>
      )}
    </div>
  );
};

export default RecipientPage;
