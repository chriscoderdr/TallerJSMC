import "./style.css";

const addDialog = document.getElementById("addDialog");

// const removeConfirmationDialog = document.getElementById(
//   "removeConfirmationDialog"
// );

// document.querySelector(".remove_action").addEventListener("click", (el) => {
//   removeConfirmationDialog.showModal();
// });

// document.querySelector(".edit_action").addEventListener("click", () => {
//   addDialog.showModal();
// });

// document.getElementById("addButton").addEventListener("click", () => {
//   addDialog.showModal();
// });

const fightersContainer = document.getElementById("fighters_container");

const fetchFighterTemplate = async () => {
  const response = await fetch('fighter.html.text');
  const html = await response.text();
  return html
}


const fighter = await fetchFighterTemplate();

fightersContainer.innerHTML += fighter;

const fighters = [
  {
    name: "Picachu",
    description:
      "Pikachu, also known as Pika (ピカチュウ), hails from the Pokémon universe. It made its debut in the series’ first generation and has become an iconic character across various media.",
    stats: [],
  },
];
