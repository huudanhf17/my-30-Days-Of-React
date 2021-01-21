btn.onclick = () => {
  res.innerHTML = getDaysInMonth(month.value, year.value);
};

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
