const localStorageKey = "index-memory";

class Event {
  constructor(_name, _cognome, _email, _address) {
    this.name = _name;
    this.cognome = _cognome;
    this._email = _email;
    this._address = _address;
  }
}
const eventNome = document.getElementById("name");
const eventCognome = document.getElementById("cognome");
const eventEmail = document.getElementById("email");
const eventAddress = document.getElementById("address");
const eventSave = document.getElementById("save-button");
const eventReset = document.getElementById("reset-button");
//
//
//
const save = () => {
  const newEvent = new Event(
    eventNome.value,
    eventCognome.value,
    eventEmail.value,
    eventAddress.value
  );
  console.log(newEvent);
  const existingEvents = localStorage.getItem(localStorageKey);
  if (existingEvents) {
    const existingEventsAsArray = JSON.parse(existingEvents);
    existingEventsAsArray.push(newEvent);
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(existingEventsAsArray)
    );
  } else {
    const events = [];
    events.push(newEvent);
    localStorage.setItem(localStorageKey, JSON.stringify(events));
  }
  eventNome.value = "";
  eventCognome.value = "";
  eventEmail.value = "";
  eventAddress.value = "";
  generateList();
};

const generateList = () => {
  const savedEvents = localStorage.getItem(localStorageKey);
  const bootstrapList = document.getElementById("events-list");
  bootstrapList.innerHTML = "";
  console.log(savedEvents);
  const savedEventsAsArray = JSON.parse(savedEvents);
  console.log(savedEventsAsArray);

  if (savedEvents) {
    savedEventsAsArray.forEach((event) => {
      let newLi = document.createElement("li");
      newLi.classList.add("list-group-item");
      newLi.innerText = `Nome: ${event.name}, Cognome: ${event.cognome}, Email: ${event._email}, Address: ${event._address}`;
      bootstrapList.appendChild(newLi);
    });
  }
};
const reset = (localStorageKey) => {
  localStorage.clear();
  secondi = 0;
};

eventSave.addEventListener("click", save);
eventReset.addEventListener("click", reset);
generateList();

let secondi = 0;

function updateTimer() {
  secondi++;
  document.getElementById("timer").textContent = secondi + " seconds";
  localStorage.setItem("tempopasato", secondi);
}

if (localStorage.getItem("tempopasato")) {
  secondi = parseInt(localStorage.getItem("tempopasato"));
  document.getElementById("timer").textContent = secondi + " seconds";
}

setInterval(updateTimer, 1000);
