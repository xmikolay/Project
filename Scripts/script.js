document.addEventListener('DOMContentLoaded', async function () {
    try {
        await getMaps();
        //await fetchUsers();
        //await fetchSuperheroes();
    } catch (error) {
        console.error('An error occurred during initialization:', error);
    }
});

const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

async function getMaps() {
    try{
        const response = await fetch('https://api.worldoftanks.eu/wot/encyclopedia/arenas/?application_id=ad0db27550136ff72d1b4d69ad6603ce');
        if (!response.ok) throw new error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();

        if (data && data.data) {
            Object.values(data.data).forEach(element => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card')
                
                const mapName = document.createElement('h3');
                mapName.textContent = `Name: ${element.name_i18n}`;

                const mapDescription = document.createElement('p');
                mapDescription.textContent = `Description: ${element.description}`;

                const camoType = document.createElement('p');
                camoType.textContent = `Camouflage: ${element.camouflage_type}`;

                card.appendChild(mapName);
                card.appendChild(mapDescription);
                card.appendChild(camoType);

                container.appendChild(card);
            });
        } else {
            console.warn('Unexpected data structure:', data);
            container.textContent = 'No maps found or incorrect data format.';
        }
        
    } catch (error){
        console.error('Fetch error', error);
        container.textContent = `Error: ${error.message || error}`;
    }
}