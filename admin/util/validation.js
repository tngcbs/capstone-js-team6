window.checkEmp = (value, idErr, message) => {
  if (value === "") {
    document.querySelector(idErr).style.display = "block";
    document.querySelector(idErr).innerHTML = message;
    return false;
  } else {
    document.querySelector(idErr).style.display = "none";
    return true;
  }
};
export default checkEmp;
