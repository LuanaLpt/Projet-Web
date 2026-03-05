document.addEventListener("DOMContentLoaded", () => {
  const detail = document.getElementById("detailsSupp");
  const tableau = document.getElementById("tableau");
  const detailsSuppCartes = document.getElementById("detailsSuppCartes");
  const overlay = document.getElementById("overlay");
  const maModal = document.getElementById("maModal");
  fetch("promo.json")
    .then((response) => response.json())
    .then((data) => {
      // Affichage liste apprenants
      data.apprenants.forEach((apprenant) => {
        let altGr = ` 
        <tr class="flex flex-row">
          <th class=" dark:bg-[#A8653F] bg-[#FBE9D0] p-10 w-1/4 flex items-center justify-center">
            ${apprenant.nom}
          </th>
          <th class="dark:bg-[#A8653F] bg-[#FBE9D0] p-10 w-1/4 flex items-center justify-center">
            ${apprenant.prenom}
          </th>
          <th class="dark:bg-[#A8653F] bg-[#FBE9D0] p-10 w-1/4 flex items-center justify-center">
            ${apprenant.ville}
          </th>
          <th class="dark:bg-[#A8653F] bg-[#FBE9D0] p-10 w-1/4 flex items-center justify-center">
            <button id="button-${apprenant.id}" class="border-b cursor-pointer">Détails</button>
          </th>
        </tr>`;
        tableau.insertAdjacentHTML("beforeend", altGr);
        // Afficharge cartes apprenants
        let cartesApprenants = `
      <div class="border rounded-md cursor-pointer dark:bg-[#A8653F] hover:bg-[#F9E2C3] hover:dark:bg-[#97583B] justify-evenly flex items-center h-32 w-1/6" data-id="${apprenant.id}">
        <img src="${apprenant.pdp}" alt="${apprenant.prenom} ${apprenant.nom}" class="w-24 h-24 rounded-md object-cover"/>
        <div>${apprenant.nom} ${apprenant.prenom} </div>
        </div>
      `;
        detailsSuppCartes.insertAdjacentHTML("beforeend", cartesApprenants);

        //Affichage du modal au clique
        detailsSuppCartes.addEventListener("click", (event) => {
          const carte = event.target.closest("[data-id]");
          if (!carte) return;
          const id = carte.dataset.id;
          const apprenant = data.apprenants.find((a) => a.id == id);
          console.log(apprenant.pdp);
          maModal.innerHTML = `
      <div class="flex items-center gap-4 "> 
        <img src="${apprenant.pdp}" alt="${apprenant.prenom} ${apprenant.nom}" class="w-34 h-34 rounded-full object-cover"/>
        <div class="border-b text-5xl">${apprenant.nom} ${apprenant.prenom}</div>
      </div>
      <div class="mt-10 gap-4"> 
      <div>Habite à ${apprenant.ville}</div>
      <div>Anecdote : ${apprenant.anecdotes}</div>
      </div>
  
  `;
          overlay.classList.remove("hidden");
        });
        //Enlève mon overlay quand je clique ailleurs ou que j'appuie sur espace
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) overlay.classList.add("hidden");
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") overlay.classList.add("hidden");
        });
        // Affichage des détails apprenants
        let bouton = document.getElementById("button-" + apprenant.id);
        bouton.addEventListener("click", () => {
          let altGr2 = `
          <div class=" dark:bg-[#A8653F] p-6 flex flex-col items-center gap-6" >
          <img src="${apprenant.pdp}" alt="${apprenant.prenom} ${apprenant.nom}" class="w-1/3 h-1/3 rounded-full object-cover" />
          <div>${apprenant.nom}</div>
          <div>${apprenant.prenom}</div>
          <div>Habite à ${apprenant.ville}</div>
          <div>Anecdote : ${apprenant.anecdotes}</div>
          </div>`;
          detail.innerHTML = altGr2;
          detail.classList.remove("hidden");
        });
      });
    });

  // Changement de thème
  const themeColor = document.querySelector("#theme");

  function appliquerTheme(valeur) {
    if (valeur === "sombre") {
      document.documentElement.classList.add("dark");
      document.querySelector(".logoThemeClair").classList.add("hidden");
      document.querySelector(".logoThemeSombre").classList.remove("hidden");
    } else {
      document.documentElement.classList.remove("dark");
      document.querySelector(".logoThemeClair").classList.remove("hidden");
      document.querySelector(".logoThemeSombre").classList.add("hidden");
    }
  }

  if (themeColor) {
    themeColor.addEventListener("change", function () {
      appliquerTheme(themeColor.value);
    });
  }
  //Changement d'affichage
  function appliquerAffichage(valeur) {
    const liste = document.querySelector(".prefListe");
    const cartes = document.querySelector(".prefCartes");
    if (!liste || !cartes) return;
    if (valeur == "cartes") {
      liste.classList.add("hidden");
      cartes.classList.remove("hidden");
      cartes.classList.add("flex", "flex-wrap", "gap-4");
    } else {
      cartes.classList.add("hidden");
      liste.classList.remove("hidden");
      cartes.classList.remove("flex", "flex-wrap", "gap-4");
    }
  }
  //Changement d'affichage au clique dans la page accueil
  const radiosAffichage = document.querySelectorAll('input[name="affichage"]');
  radiosAffichage.forEach((radio) => {
    radio.addEventListener("change", function () {
      appliquerAffichage(this.value);
    });
  });
  //Enregistre mes préférences dans le local storage
  const prefs = JSON.parse(localStorage.getItem("preferences"));
  if (prefs) {
    if (themeColor) document.getElementById("theme").value = prefs.theme;
    appliquerTheme(prefs.theme);
    appliquerAffichage(prefs.affichage);
    const radio = document.querySelector(
      `input[name="affichage"][value="${prefs.affichage}"]`,
    );
    if (radio) radio.checked = true;
  } else {
    appliquerAffichage("liste");
  }
  const msgPref = document.getElementById("prefMessage");
  const btnSauvegarder = document.getElementById("btnSauvegarder");
  if (btnSauvegarder) {
    btnSauvegarder.addEventListener("click", () => {
      const affichageChecked = document.querySelector(
        'input[name="affichage"]:checked',
      );
      msgPref.classList.remove("hidden");
      const preferences = {
        theme: document.getElementById("theme").value,
        affichage: affichageChecked ? affichageChecked.value : "liste",
      };
      localStorage.setItem("preferences", JSON.stringify(preferences));
    });
  }
  // La carte
  const mapElement = document.getElementById("map");
  if (mapElement) {
    const map = L.map("map").setView([46.603354, 1.888334], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    fetch("promo.json")
      .then((response) => response.json())
      .then((data) => {
        data.apprenants.forEach((apprenant) => {
          L.marker([
            apprenant.coordonnees.latitude,
            apprenant.coordonnees.longitude,
          ])
            .addTo(map)
            .bindPopup(
              `${apprenant.nom} ${apprenant.prenom} - ${apprenant.ville}`,
            );
        });
      });
  }
});
