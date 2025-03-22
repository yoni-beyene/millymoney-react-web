import { useState, useEffect } from "react";
import RecipientList from "../../components/recipient/RecipientList";
import Header from "../../components/shared/header/Header";
import RecipientDetails from "../../components/recipient/RecipientDetails";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBell,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./RecipientPage.scss";
import HTTPService from "../../services/shared/HTTPService";
import LoadingPage from "../../components/shared/loadingPage/LoadingPage";
import PrimaryButton from "../../components/shared/primaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const RecipientPage = () => {
  const navigate = useNavigate();

  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const senderId = useSelector((state) => state.global.senderId);
  const [isLoading, setIsLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);

  useEffect(() => {
    readAllRecipient();
  }, []);

  const readAllRecipient = () => {
    HTTPService.post(`/sender/recipient/get-recipient/${senderId}`)
      .then((res) => {
        setFilteredRecipients(res.data.recipients);
        setRecipients(res.data.recipients);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.err ?? "Error occured please try again!"
        );

        setIsLoading(false);
      });
  };

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
      <main className="content p-5">
        <div className="d-flex justify-content-between mb-4">
          <h2>Recipient</h2>
          <FontAwesomeIcon icon={faBell} />
        </div>
        {showModal && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => handleCloseModal()}
            className="back-icon my-2"
            size="2x"
          />
        )}
        {showModal ? (
          <RecipientDetails
            handleCloseModal={handleCloseModal}
            selectedRecipient={selectedRecipient}
          />
        ) : (
          <>
            <section className="amount-section d-flex justify-content-between w-100 py-2 mb-3">
              <div
                className="amount-input-container my-2"
                style={{ maxWidth: "400px" }}
              >
                <input
                  type="text"
                  placeholder="Find Recipients"
                  className="amount-input my-3 py-3"
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
                  text={
                    <span>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="me-2"
                        size="1x"
                      />{" "}
                      Add Recipient
                    </span>
                  }
                  onClick={() => navigate("/recipient/add-new")}
                  isLoading={false}
                />
              </div>
            </section>
            {/* <div className="d-flex justify-content-between align-items-center mb-3">
              <select className="form-select w-auto select-recipient-options">
                <option value="all">All Recipient</option>
                <option value="recent">Recently Added</option>
              </select>
            </div>{" "} */}
            {isLoading ? (
              <LoadingPage />
            ) : (
              <RecipientList
                recipients={filteredRecipients}
                handleRecipientClick={handleRecipientClick}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default RecipientPage;
