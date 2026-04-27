document.addEventListener("DOMContentLoaded", () => {
    const parametriURL = new URLSearchParams(window.location.search);
    const marcaSelectata = parametriURL.get('marca');

    const titluElement = document.getElementById('titlu-catalog');
    const gridContainer = document.getElementById('grid-masini');

    // Oprim execuția dacă scriptul rulează pe altă pagină (ex: index.html)
    if (!titluElement || !gridContainer) return; 

    if (!marcaSelectata) {
        titluElement.innerText = "TOT STOCUL DISPONIBIL";
        incarcaCatalogul(null);
    } else {
        titluElement.innerText = `STOC DISPONIBIL: ${marcaSelectata}`;
        incarcaCatalogul(marcaSelectata);
    }

    async function incarcaCatalogul(marca) {
        gridContainer.innerHTML = `<div class="mesaj-sistem">Se procesează stocul...</div>`;

        try {
            await new Promise(resolve => setTimeout(resolve, 300)); 

            const raspuns = await fetch('catalog.json');
            
            if (!raspuns.ok) {
                throw new Error("Eroare la citirea fișierului JSON");
            }
            
            let masini = await raspuns.json();

            if (marca) {
                masini = masini.filter(m => m.marca === marca);
            }

            const masiniDeAfisat = masini.slice(0, 6);

            gridContainer.innerHTML = ""; 

            if (masiniDeAfisat.length === 0) {
                gridContainer.innerHTML = `<div class="mesaj-sistem">Momentan nu avem pe stoc modele pentru marca <strong>${marca}</strong>. Ne poți contacta pentru o comandă personalizată.</div>`;
                return;
            }

            masiniDeAfisat.forEach((masina, index) => {
                const card = document.createElement('div');
                card.className = 'card-masina';
                card.style.animationDelay = `${index * 0.1}s`;

                card.innerHTML = `
                    <div class="imagine-masina" style="background-color: #ffffff; padding: 10px;">
                        <img src="imagini/${masina.imagine}" alt="${masina.marca} ${masina.model}" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="detalii-masina">
                        <h3>${masina.marca} ${masina.model}</h3>
                        <ul class="specificatii">
                            <li><span>An fabricație</span> <strong>${masina.an}</strong></li>
                            <li><span>Combustibil</span> <strong>Diesel</strong></li>
                        </ul>
                        <div class="pret">€${masina.pret.toLocaleString()}</div>
                        <button class="btn-detalii">CERE OFERTĂ</button>
                    </div>
                `;

                gridContainer.appendChild(card);
            });

        } catch (eroare) {
            console.error(eroare);
            gridContainer.innerHTML = `<div class="mesaj-sistem" style="border-left-color: #e63946;">Eroare de conexiune la baza de date. Vă rugăm să rulați pe un Live Server.</div>`;
        }
    }

    
});