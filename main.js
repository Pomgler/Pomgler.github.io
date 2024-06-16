
const arrow = document.querySelector(".arrow-icon");
const closeIcon = document.querySelector(".close-icon");
const buttonReserved = document.querySelector(".button-reserved");
const modal = document.querySelector(".modal");
const dataBox = document.querySelector(".data-box");
const reservationTitle = document.querySelector(".reservation-title");
const form = document.querySelector(".form");


const RESERVATIONS_KEY = "reservaions";
const OFFSET = 300;

const invalidDataMsg = "Не вказано";

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const reservaionData = {
  guests: 1,
  date: "",
  time: ""
};


document.addEventListener("scroll", () => {
  if (window.scrollY > OFFSET) {
    arrow.style.display = "block";
  }
  
  if (window.scrollY < OFFSET) {
    arrow.style.display = "none";
  }
});

arrow.addEventListener("click", scrollUp);

closeIcon.addEventListener("click", ev => {
  ev.target.parentElement.style.display = "none";
});

buttonReserved.addEventListener("click", () => {
  modal.style.display = "block";
  const res = loadReservaations();

  if (!res) {
    reservationTitle.innerHTML  = "Немає резервацій";
    return;
  }

  reservationTitle.innerHTML  = "Резервації";
  
  const {guests, date, time} = reservaionData;

  modal.insertAdjacentHTML(
    "beforeend", `
    <article class="reservations">
    <div class="reservation-data">
      <p>Кількість осіб:</p>
      <p>${guests}</p>
    </div>
    <div class="reservation-data">
      <p>Дата:</p>
      <p>${date || invalidDataMsg}</p>
    </div>
    <div class="reservation-data">
      <p>Час:</p>
      <p>${time || invalidDataMsg}</p>
    </div>
  </article>
  `);
});

form.addEventListener("submit", ev => {
  ev.preventDefault();
  const {date, time, guests} = reservaionData;
  saveToStorage(reservaionData);

  alert(`Зарезервовано:\n\nКількість осіб: ${guests || invalidDataMsg}\nДата: ${date || invalidDataMsg}\nЧас: ${time || invalidDataMsg}`);
});

document.getElementById("guests").addEventListener("change", ev => {
  reservaionData.guests = ev.target.value;
});
document.getElementById("date").addEventListener("change", ev => {
  reservaionData.date = ev.target.value;
});
document.getElementById("time").addEventListener("change", ev => {
  reservaionData.time = ev.target.value;
});


function loadReservaations() {
  const reservaions = sessionStorage.getItem(RESERVATIONS_KEY);

  if (reservaions) {
    return JSON.parse(reservaions);
  }

  return reservaions;
}

function saveToStorage(data) {
  sessionStorage.setItem(RESERVATIONS_KEY, JSON.stringify(data));
}