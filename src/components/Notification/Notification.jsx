import React from "react";
import PropTypes from "prop-types";
import { Text } from "./Notification.styled";

const Notification = ({ message }) => {
  return <Text>{message}</Text>;
};

// Notification.defaultProps = {
//   message: "No feedback given",
// };

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
