import PropTypes from "prop-types";
import "./PrimaryButton.scss";

const PrimaryButton = ({
  text,
  onClick,
  isLoading,
  disabled,
  borderRadius,
}) => {
  return (
    <button
      className={`primary-button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={
        borderRadius ? { borderRadius: borderRadius } : { borderRadius: "16px" }
      }
    >
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <span className="button-text">{text}</span>
      )}
    </button>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  borderRadius: PropTypes.number,
};

PrimaryButton.defaultProps = {
  isLoading: false,
  disabled: false,
};

export default PrimaryButton;
