import "./style.css";

const addDialog = document.getElementById("addDialog");

const setup = () => {
  const removeConfirmationDialog = document.getElementById(
    "removeConfirmationDialog"
  );

  document
    .getElementById("delete_dismiss_button")
    .addEventListener("click", () => {
      removeConfirmationDialog.close();
    });
  const deleteConfirmButton = document.getElementById("delete_confirm_button");
  deleteConfirmButton.addEventListener("click", (event) => {
    const toDelete = event.target.getAttribute("toDelete");
    document.getElementById(toDelete).remove();
    removeConfirmationDialog.close();
  });

  document.querySelectorAll(".remove_action").forEach((el) => {
    el.addEventListener("click", (event) => {
      deleteConfirmButton.setAttribute(
        "toDelete",
        event.target.closest(".fighter").getAttribute("id")
      );

      removeConfirmationDialog.showModal();
    });
  });

  document.querySelector(".edit_action").addEventListener("click", () => {
    addDialog.showModal();
  });

  document.getElementById("addButton").addEventListener("click", () => {
    addDialog.showModal();
  });
};

const fightersContainer = document.getElementById("fighters_container");

const fetchFighterTemplate = async () => {
  const response = await fetch("fighter.html.text");
  const html = await response.text();
  return html;
};

// const fighter = await fetchFighterTemplate();

// fightersContainer.innerHTML += fighter;

const fighterToTemplate = async (fighter) => {
  let template = (await fetchFighterTemplate())
    .replaceAll("${number}", getFighterNumber(fighter))
    .replace("${name}", fighter.name)
    .replace("${description}", fighter.description)
    .replace("${image}", fighter.image);
  fighter.stats.forEach((stat) => {
    template = template.replace("${" + stat.label + "}", stat.value);
  });
  return template;
};

const getFighterNumber = (fighter) => {
  return fighter.stats.find((stat) => (stat.label = "fighter_number")).value;
};

const loadData = async () => {
  const fighters = (await (await fetch("data.json")).json()).data;
  let fightersList = "";
  for (let fighter of fighters) {
    fightersList += await fighterToTemplate(fighter);
  }
  fightersContainer.innerHTML = fightersList;

  setup();
};

loadData();
