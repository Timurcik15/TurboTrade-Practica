document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-box');

    form.addEventListener('submit', (eveniment) => {
        eveniment.preventDefault();

        const emailIntrodus = document.getElementById('email').value.trim();
        const parolaIntrodusa = document.getElementById('password').value;

        const utilizatoriSalvati = JSON.parse(localStorage.getItem('utilizatori')) || [];

        const utilizatorGasit = utilizatoriSalvati.find(
            user => user.email === emailIntrodus && user.parola === parolaIntrodusa
        );
        console.log('Utilizator găsit:', utilizatorGasit);

        if (utilizatorGasit) {
            afiseazaMesaj('Autentificare reușită!', 'succes');
            
            localStorage.setItem('utilizatorCurent', JSON.stringify(utilizatorGasit));

            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 1500);
        } else {
            afiseazaMesaj('Email sau parolă greșită!', 'eroare');
        }
    });

    function afiseazaMesaj(mesaj, tip) {
        let mesajExistent = document.querySelector('.mesaj-alerta');
        if (mesajExistent) mesajExistent.remove();

        const div = document.createElement('div');
        div.className = `mesaj-alerta ${tip}`;
        div.innerText = mesaj;
        div.style.padding = "10px";
        div.style.marginBottom = "15px";
        div.style.borderRadius = "5px";
        div.style.textAlign = "center";
        
        
        if(tip === 'eroare') {
            div.style.backgroundColor = "#ff4d4d";
            div.style.color = "white";
        } else {
            div.style.backgroundColor = "#4CAF50";
            div.style.color = "white";
        }

        form.insertBefore(div, form.querySelector('.submit-btn'));
    }
});