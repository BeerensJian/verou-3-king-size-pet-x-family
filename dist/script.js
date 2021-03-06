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
      backgroundColor: '#88C443',
      borderColor: '#88C443',
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

const weightButton = document.querySelector(".addweight__button");
const weightItems = document.querySelector(".addweight__content");

function Dropdown() {
  weightItems.classList.toggle("show");
}

weightButton.addEventListener("click", Dropdown)