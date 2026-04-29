
document.addEventListener("DOMContentLoaded", () => {
    const dateUtilizatorString = localStorage.getItem("utilizatorCurent");

    if (dateUtilizatorString) {
        const utilizator = JSON.parse(dateUtilizatorString);

        const emailElement = document.getElementById("user-email");
        if (emailElement) {
            emailElement.textContent = utilizator.email; 
        }

        const btnLogoutProfil = document.getElementById("logout-profil-btn");
        if (btnLogoutProfil) {
            btnLogoutProfil.addEventListener("click", () => {
                localStorage.removeItem("utilizatorCurent");
                window.location.href = "index.html";
            });
        }
    } else {
        window.location.href = "login.html";
    }
});