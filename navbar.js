document.addEventListener("DOMContentLoaded", () => {
    // 1. Găsim butoanele în HTML
    const navLogin = document.getElementById("nav-login");
    const navProfil = document.getElementById("nav-profil");
    const navLogout = document.getElementById("nav-logout");
    const btnLogoutAction = document.getElementById("btn-logout-action");

    // 2. Verificăm dacă există cineva logat (cheia 'utilizatorCurent' setată de login.js)
    const utilizator = localStorage.getItem("utilizatorCurent");

    // 3. Ascundem sau arătăm butoanele în funcție de status
    if (utilizator) {
        // Când ești logat
        if (navLogin) navLogin.style.display = "none";
        if (navProfil) navProfil.style.display = "inline-block"; 
        if (navLogout) navLogout.style.display = "inline-block";
    } else {
        // Când NU ești logat
        if (navLogin) navLogin.style.display = "inline-block";
        if (navProfil) navProfil.style.display = "none";
        if (navLogout) navLogout.style.display = "none";
    }

    // 4. Funcția pentru butonul de LOGOUT din bara de sus
    if (btnLogoutAction) {
        btnLogoutAction.addEventListener("click", (event) => {
            event.preventDefault(); 
            // Ștergem contul din memorie
            localStorage.removeItem("utilizatorCurent");
            // Reîncărcăm pagina sau mergem pe index
            window.location.href = "index.html"; 
        });
    }
});