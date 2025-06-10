const inputTache = document.getElementById('tache');
const boutonAjouter = document.getElementById('ajouter');
const boutonSupprimer = document.getElementById('supprimer');
const liste = document.getElementById('liste');
const message = document.getElementById('message');

boutonSupprimer.style.display = 'none';

function majAffichageBoutonSupprimer() {
    const checkboxes = document.querySelectorAll('#liste input[type="checkbox"]');
    const auMoinsUnCoche = Array.from(checkboxes).some(cb => cb.checked);
    boutonSupprimer.style.display = auMoinsUnCoche ? 'inline' : 'none';
}

function supprimerTachesCochees() {
    const taches = document.querySelectorAll('#liste li');
    taches.forEach(tache => {
        const checkbox = tache.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            tache.remove();
        }
    });
    majAffichageBoutonSupprimer();
}

function ajouterTache() {
    const texte = inputTache.value.trim();
    if (texte === '') {
        message.textContent = 'Veuillez écrire une tâche !';
        return;
    }

    message.textContent = '';
    supprimerTachesCochees();

    const nouvelleTache = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', majAffichageBoutonSupprimer);

    const texteTache = document.createTextNode(texte);
    nouvelleTache.appendChild(checkbox);
    nouvelleTache.appendChild(texteTache);
    liste.appendChild(nouvelleTache);

    inputTache.value = '';
}

// Gérer le clic du bouton
boutonAjouter.addEventListener('click', ajouterTache);

// Gérer le clic du bouton supprimer
boutonSupprimer.addEventListener('click', supprimerTachesCochees);

// Gérer l’appui sur la touche Entrée dans l’input
inputTache.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        ajouterTache();
    }
});
