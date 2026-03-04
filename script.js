document.addEventListener("DOMContentLoaded", () => {




  
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

  function appliquerAffichage(valeur) {
    const liste = document.querySelector(".prefListe");
    const cartes = document.querySelector(".prefCartes");
    if (!liste || !cartes) return;
    if (valeur == "cartes") {
      liste.classList.add("hidden");
      cartes.classList.remove("hidden");
    } else {
      cartes.classList.add("hidden");
      liste.classList.remove("hidden");
    }
  }

  const radiosAffichage = document.querySelectorAll('input[name="affichage"]');
  radiosAffichage.forEach((radio) => {
    radio.addEventListener("change", function () {
      appliquerAffichage(this.value);
    });
  });

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
  const btnSauvegarder = document.getElementById("btnSauvegarder");
  if (btnSauvegarder) {
    btnSauvegarder.addEventListener("click", () => {
      const affichageChecked = document.querySelector(
        'input[name="affichage"]:checked',
      );
      const preferences = {
        theme: document.getElementById("theme").value,
        affichage: affichageChecked ? affichageChecked.value : "liste",
      };
      localStorage.setItem("preferences", JSON.stringify(preferences));
    });
  }
  
});

const detail = document.getElementById("detailsSupp")
const tableau = document.getElementById("tableau")
  
  fetch('promo.json')
  .then(response => response.json())
  .then(data => {
    data.apprenants.forEach(apprenant => {
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
            <button id="button-${apprenant.id}" class=" border-b cursor-pointer">Détails</button>
          </th>
        </tr>`;

      tableau.insertAdjacentHTML('beforeend', altGr); 

      let bouton = document.getElementById("button-" + apprenant.id); 
      bouton.addEventListener("click", () => {
        let altGr2 = `
          <div class=" dark:bg-[#A8653F] p-6 flex flex-col items-center gap-10" >
          <img src="${apprenant.pdp}" alt="${apprenant.prenom} ${apprenant.nom}" class="w-24 h-24 rounded-full object-cover" />
          <div>${apprenant.nom}</div>
          <div>${apprenant.prenom}</div>
          <div>${apprenant.ville}</div>
          <div class="flex flex-wrap">${apprenant.anecdotes}</div>
          </div>`; 

        detail.innerHTML = altGr2; 
        detail.classList.remove("hidden");
      });
    });
  });

  

