document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-box');

    form.addEventListener('submit', (eveniment) => {
        eveniment.preventDefault(); 

        const nume = document.getElementById('name').value.trim();
        const prenume = document.getElementById('surname').value.trim();
        const telefon = document.getElementById('phone-number').value.trim();
        const email = document.getElementById('email').value.trim();
        const parola = document.getElementById('password').value;
        const confirmareParola = document.getElementById('password-confirm').value;

       
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefon = /^\d+$/; 

        if (nume === "" || prenume === "" || telefon === "" || email === "" || parola === "") {
            afiseazaMesaj('Toate câmpurile sunt obligatorii!', 'eroare');
            return;
        }

        if (!regexEmail.test(email)) {
            afiseazaMesaj('Formatul emailului este invalid!', 'eroare');
            return;
        }

        if (!regexTelefon.test(telefon)) {
            afiseazaMesaj('Numărul de telefon trebuie să conțină doar cifre!', 'eroare');
            return;
        }

        if (telefon.length < 8) {
            afiseazaMesaj('Numărul de telefon trebuie să fie minim de 9 cifre', 'eroare');
            return;
        }

        if (parola.length < 8) {
            afiseazaMesaj('Parola trebuie să aibă minimum 8 caractere!', 'eroare');
            return;
        }

        if (parola !== confirmareParola) {
            afiseazaMesaj('Parolele nu coincid!', 'eroare');
            return;
        }

        const utilizatorNou = {
            nume: nume,
            prenume: prenume,
            telefon: telefon,
            email: email,
            parola: parola 
        };

        let utilizatoriSalvati = JSON.parse(localStorage.getItem('utilizatori')) || [];
        
        let emailExistent = utilizatoriSalvati.find(user => user.email === email);
        if (emailExistent) {
            afiseazaMesaj('Acest email este deja folosit!', 'eroare');
            return;
        }

        utilizatoriSalvati.push(utilizatorNou);
        localStorage.setItem('utilizatori', JSON.stringify(utilizatoriSalvati));

        afiseazaMesaj('Cont creat cu succes! Vei fi redirecționat...', 'succes');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
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