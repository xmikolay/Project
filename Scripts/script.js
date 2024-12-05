document.addEventListener('DOMContentLoaded', async function () {
    try {   
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('players'))
        {
            await getPlayers();
        }
        else if (currentPage.includes('maps'))
        {
            await getMaps();
        }
        else if(currentPage.includes('tanks'))
        {
            await getTanks();
        }
        
        
    } catch (error) {
        console.error('An error occurred during initialization:', error);
    }
});

const MAP_API = 'https://api.worldoftanks.eu/wot/encyclopedia/arenas/?application_id=ad0db27550136ff72d1b4d69ad6603ce';

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

async function getPlayers() {
    const playerName = document.getElementById('playerName').value.trim();

    if (!playerName) {
        alert('Please enter a player name.');
        return;
    }

    const PLAYER_API = `https://api.worldoftanks.eu/wot/account/list/?application_id=ad0db27550136ff72d1b4d69ad6603ce&search=${playerName}`;
    const container = document.getElementById('results');
    container.innerHTML = ''; 

    try {
        const response = await fetch(PLAYER_API);
        if (!response.ok) throw new Error(`HTTP getting Player Data: ${response.status}`);
        const data = await response.json();

        if (data.status == 'ok' && data.data.length > 0) {
            data.data.forEach(player => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const playerName = document.createElement('h3');
                playerName.textContent = `Player: ${player.nickname}`;

                const playerAccountId = document.createElement('p');
                playerAccountId.textContent = `Account ID: ${player.account_id}`;

                card.appendChild(playerName);
                card.appendChild(playerAccountId);

                container.appendChild(card);
            });
        } else {
            container.textContent = 'No players found.';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        container.textContent = `Error: ${error.message}`;
    }
}

async function getTanks() {
    const nation = document.getElementById('nation').value.trim();

    if (!nation) {
        alert('Please enter Nation.');
        return;
    }

    const TANK_API = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=ad0db27550136ff72d1b4d69ad6603ce&nation=${nation}`;
    const container = document.getElementById('results');
    container.innerHTML = ''; 

    try {
        const response = await fetch(TANK_API);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();

        if (data && data.data) {
            Object.values(data.data).forEach(nation => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const tankImg = document.createElement('img');
                tankImg.src = nation.images.big_icon;   

                const tankName = document.createElement('h3');
                tankName.textContent = `Tank Name: ${nation.short_name}`;

                const tankType = document.createElement('p');
                tankType.textContent = `Tank type: ${nation.type}`;

                const tankTier = document.createElement('p');
                tankTier.textContent = `Tank tier: ${nation.tier}`;

                const tankDesc = document.createElement('p');
                tankDesc.textContent = `${nation.description}`;

                card.appendChild(tankImg);
                card.appendChild(tankName);
                card.appendChild(tankType);
                card.appendChild(tankTier);
                card.appendChild(tankDesc);

                container.appendChild(card);
            });
        } else {
            container.textContent = 'No tanks found / Incorrect nation name.';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        container.textContent = `Error: ${error.message}`;
    }
}

async function getMaps() {
    try{
        const response = await fetch(`${MAP_API}`);
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
            container.textContent = 'No maps found.';
        }
        
    } catch (error){
        console.error('Fetch error', error);
        container.textContent = `Error: ${error.message}`;
    }
}