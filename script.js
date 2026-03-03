document.addEventListener("DOMContentLoaded", () => {
  const themeColor = document.querySelector("#theme")

  function appliquerTheme(valeur) {
    if (valeur === "sombre") {
      document.documentElement.classList.add("dark");
      document.querySelector(".logoThemeClair").classList.add("hidden")
      document.querySelector(".logoThemeSombre").classList.remove("hidden")
    } else {
      document.documentElement.classList.remove("dark");
      document.querySelector(".logoThemeClair").classList.remove("hidden")
      document.querySelector(".logoThemeSombre").classList.add("hidden")
    }
  }

  if (themeColor) {
    themeColor.addEventListener("change", function () {
      appliquerTheme(themeColor.value)
    });
  }

  function appliquerAffichage(valeur) {
    const liste = document.querySelector(".prefListe")
    const cartes = document.querySelector(".prefCartes")
    if (!liste || !cartes) return 
    if (valeur == "cartes") {
      liste.classList.add("hidden")
      cartes.classList.remove("hidden");
    }
    else {
        cartes.classList.add("hidden")
        liste.classList.remove("hidden")
    }
  }


  const radiosAffichage = document.querySelectorAll('input[name="affichage"]')
    radiosAffichage.forEach(radio => {
    radio.addEventListener("change", function() {
        appliquerAffichage(this.value)
    })
})

  const prefs = JSON.parse(localStorage.getItem("preferences"));
  if (prefs) {
    if (themeColor) document.getElementById("theme").value = prefs.theme
    appliquerTheme(prefs.theme);
    appliquerAffichage(prefs.affichage)
    const radio = document.querySelector(`input[name="affichage"][value="${prefs.affichage}"]`)
    if (radio) radio.checked = true
    
  }

  else {
    appliquerAffichage("liste")
  }
  const btnSauvegarder = document.getElementById("btnSauvegarder")
  if (btnSauvegarder) {
    btnSauvegarder.addEventListener("click", () => {
    const affichageChecked = document.querySelector('input[name="affichage"]:checked')
    const preferences = {
        theme: document.getElementById("theme").value,
        affichage : affichageChecked ? affichageChecked.value :"liste"
      };
      localStorage.setItem("preferences", JSON.stringify(preferences))
    });
  }
});
 