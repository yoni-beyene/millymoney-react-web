const numberWithCommas = (num) => {
  const parsedNum = Number(num);
  if (isNaN(parsedNum)) return "Invalid number";
  return parsedNum.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default numberWithCommas;
