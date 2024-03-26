function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sortDates(urls) {
  const datesList = [];
  for (let i = 0; i < urls.length; i++) {
    let docURL = urls[i];
    let date = new Date(
      parseInt(docURL.slice(-19, -15)),
      parseInt(docURL.slice(-15, -13)),
      parseInt(docURL.slice(-13, -11))
    );
    if (isNaN(date)) {
      date = "Unknown Date " + i;
    }
    datesList.push([date, formatDate(date), docURL]);
  }
  datesList.sort((a, b) => a[0] - b[0]);
  return datesList;
}

export default sortDates;
