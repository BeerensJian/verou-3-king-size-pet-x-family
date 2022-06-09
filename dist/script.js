const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Weight in KG',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [3.5, 4, 5, 4, 4.6, 4, 6],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
        tension : 0.2
    }
  };

const myChart = new Chart(
document.getElementById('myChart'),
config
);

const moreButton = document.querySelector(".more__button");
const items = document.querySelector(".more__content");

function showDropdown() {
  items.classList.toggle("show");
}

moreButton.addEventListener("click", showDropdown)