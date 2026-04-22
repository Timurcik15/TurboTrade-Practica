document.addEventListener('DOMContentLoaded', function() {

    const slidere = document.querySelectorAll('.custom-slider');
    const pretSlider = slidere[0];
    const avansSlider = slidere[1];
    const dobandaSlider = slidere[2];
    const perioadaSlider = slidere[3];

    const valoriHeader = document.querySelectorAll('.input-header .value');
    const pretText = valoriHeader[0];
    const avansText = valoriHeader[1];
    const dobandaText = valoriHeader[2];
    const perioadaText = valoriHeader[3];
    const avansProcentText = document.querySelector('.sub-value');

    const plataLunaraText = document.querySelector('.result-value-large');
    const plataLunaraSubtext = document.querySelector('.result-subtext');
    const rezultateSecundare = document.querySelectorAll('.result-value');
    const totalCreditText = rezultateSecundare[0];
    const dobandaTotalaText = rezultateSecundare[1];
    const totalPlataText = rezultateSecundare[2];
    const avansRezultatText = rezultateSecundare[3];

    function formatBani(valoare) {
        return new Intl.NumberFormat('ro-RO').format(Math.round(valoare)) + ' EUR';
    }

    // 4. Funcția principală de calcul
    function calculeazaRata() {
        // Preluăm valorile curente din slidere
        let pret = parseFloat(pretSlider.value);
        let avans = parseFloat(avansSlider.value);
        let dobanda = parseFloat(dobandaSlider.value);
        let luni = parseInt(perioadaSlider.value);

        avansSlider.max = pret;
        if (avans > pret) {
            avans = pret;
            avansSlider.value = pret;
        }

        pretText.textContent = formatBani(pret);
        avansText.textContent = formatBani(avans);
        dobandaText.textContent = dobanda.toFixed(2) + '%';
        perioadaText.textContent = luni + ' luni';
        
        // Calculăm și afișăm procentul avansului
        let procentAvans = (avans / pret) * 100;
        avansProcentText.textContent = procentAvans.toFixed(1) + '%';

        let principal = pret - avans; 
        let dobandaLunara = (dobanda / 100) / 12;
        let plataLunara = 0;

        if (dobandaLunara === 0) {
            plataLunara = principal / luni; 
        } else {
            plataLunara = principal * (dobandaLunara * Math.pow(1 + dobandaLunara, luni)) / (Math.pow(1 + dobandaLunara, luni) - 1);
        }

        let totalDePlata = plataLunara * luni;
        let dobandaTotala = totalDePlata - principal;

        // 5. Afișăm rezultatele în partea dreaptă
        plataLunaraText.textContent = formatBani(plataLunara);
        plataLunaraSubtext.textContent = 'pe ' + (luni / 12) + ' ani';
        
        totalCreditText.textContent = formatBani(principal);
        dobandaTotalaText.textContent = formatBani(dobandaTotala);
        totalPlataText.textContent = formatBani(totalDePlata);
        avansRezultatText.textContent = formatBani(avans);
    }

    slidere.forEach(slider => {
        slider.addEventListener('input', calculeazaRata);
    });

    calculeazaRata();
});