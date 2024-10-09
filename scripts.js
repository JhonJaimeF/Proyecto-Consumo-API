document.querySelector('#btnShowAll').onclick = async () => {
    try {
        const res = await fetch('/api/characters');
        const data = await res.json();
        renderResults(data);
        updateMessage('Ruta utilizada: GET /api/characters');
    } catch (err) {
        console.error('Error al obtener personajes:', err);
    }
};

document.querySelector('#btnSearchId').onclick = async () => {
    const idInput = document.querySelector('#searchId').value.trim();
    if (idInput) {
        try {
            const res = await fetch(`/api/characters/${idInput}`);
            if (res.ok) {
                const characterData = await res.json();
                renderResults([characterData]);
                updateMessage(`Ruta utilizada: GET /api/characters/${idInput}`);
            } else {
                alert('Personaje no encontrado o error en la búsqueda.');
                resetMessage();
            }
        } catch (err) {
            console.error('Error al buscar ID:', err);
        }
    } else {
        alert('Por favor, ingresa un ID válido.');
        resetMessage();
    }
};

document.querySelector('#btnSearchName').onclick = async () => {
    const nameInput = document.querySelector('#searchName').value.trim();
    if (nameInput) {
        try {
            const res = await fetch(`/api/characters/name/${nameInput}`);
            if (res.ok) {
                const characterList = await res.json();
                renderResults(characterList);
                updateMessage(`Ruta utilizada: GET /api/characters/name/${nameInput}`);
            } else {
                alert('Personaje no encontrado o error en la búsqueda.');
                resetMessage();
            }
        } catch (err) {
            console.error('Error al buscar por nombre:', err);
        }
    } else {
        alert('Por favor, ingresa un nombre válido.');
        resetMessage();
    }
};

function renderResults(characterList) {
    const resultsTable = document.querySelector('#results');
    resultsTable.innerHTML = '';
    characterList.forEach(character => {
        const row = `<tr>
          <td>${character._id}</td>
          <td>${character.name}</td>
          <td>${character.height}</td>
          <td>${character.gender}</td>
          <td>${character.homeworld}</td>
          <td>${character.species}</td>
        </tr>`;
        resultsTable.innerHTML += row;
    });
}

function updateMessage(msg) {
    document.querySelector('#message').innerText = msg;
}

function resetMessage() {
    document.querySelector('#message').innerText = '';
}
