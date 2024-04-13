import "./style.css";

const addDialog = document.getElementById("addDialog");

const setup = () => {
  const removeConfirmationDialog = document.getElementById(
    "removeConfirmationDialog"
  );

  document.querySelector(".remove_action").addEventListener("click", (el) => {
    removeConfirmationDialog.showModal();
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
    .replace("${name}", fighter.name)
    .replace("${description}", fighter.description)
    .replace("${image}", fighter.image);
  fighter.stats.forEach((stat) => {
    template = template.replace("${" + stat.label + "}", stat.value);
  });
  return template;
};

const fighters = [
  {
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bfdb7d48-342a-4f44-8f2d-ca5203070d57/dce8cej-991bdf14-2562-43f5-a907-31827ce01cde.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JmZGI3ZDQ4LTM0MmEtNGY0NC04ZjJkLWNhNTIwMzA3MGQ1N1wvZGNlOGNlai05OTFiZGYxNC0yNTYyLTQzZjUtYTkwNy0zMTgyN2NlMDFjZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.IAkJVDBNHeZjPGt2BF9YSv1tANpA-k7Tfv9rwmhXalE",
    name: "Cherise",
    description:
      "Pikachu, also known as Pika (ピカチュウ), hails from the Pokémon universe. It made its debut in the series’ first generation and has become an iconic character across various media.",
    stats: [
      { label: "fighter_number", value: 8 },
      { label: "unlock_order", value: "default" },
      { label: "number_of_jumps", value: 2 },
      { label: "weight", value: 79 },
      { label: "dash_speed", value: 2.039 },
      { label: "air_speed", value: 0.957 },
      { label: "fast_fall_speed", value: 2.48 },
    ],
  },
  {
    image: "https://ssb.wiki.gallery/images/0/07/Kirby_SSBU.png",
    name: "Kirby",
    description:
      "Kirby, also known as カービィ (Kirby), hails from the whimsical Planet Popstar in the Kirby game series. He made his debut in the series first generation and has become an iconic character across various media.",
    stats: [
      { label: "fighter_number", value: 6 },
      { label: "unlock_order", value: "default" },
      { label: "number_of_jumps", value: 6 },
      { label: "weight", value: 79 },
      { label: "dash_speed", value: 1.72 },
      { label: "air_speed", value: 1.08 },
      { label: "fast_fall_speed", value: 2.08 },
    ],
  },
];
const loadData = async () => {
  let fightersList = "";
  for (let fighter of fighters) {
    fightersList += await fighterToTemplate(fighter);
  }
  fightersContainer.innerHTML = fightersList;

  setup();
};

loadData();
