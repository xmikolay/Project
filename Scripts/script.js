document.addEventListener('DOMContentLoaded', async function () {
    try {   
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('players'))
        {
            await getPlayers();
            await getPlayerStats();
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
    const container = document.getElementById('resultsPlayer');
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

//THIS DOESNT WORK
/*async function getPlayerStats() {
    const playerID = document.getElementById('playerID').value.trim();

    if (!playerID) {
        alert('Please enter a player ID.');
        return;
    }

    const PLAYERID_API = `https://api.worldoftanks.eu/wot/account/info/?application_id=ad0db27550136ff72d1b4d69ad6603ce&account_id=${playerID}`;
    const container = document.getElementById('resultsID');
    container.innerHTML = ''; 

    try {
        const response = await fetch(PLAYERID_API);
        if (!response.ok) throw new Error(`HTTP getting Player Data: ${response.status}`);
        const data = await response.json();

        if (data && data.data) {
            Object.values(data.data).forEach(player => {
                const stats = player.stats.all

                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const playerWins = document.createElement('p');
                playerWins.textContent = `Wins: ${stats.wins}`;

                const playerLosses = document.createElement('p');
                playerLosses.textContent = `Losses: ${stats.losses}`;

                const playerDraws = document.createElement('p');
                playerDraws.textContent = `Draws: ${stats.draws}`;

                const playerTotalFrags = document.createElement('p');
                playerTotalFrags.textContent = `Total Frags: ${stats.wins}`;

                const playerMaxFrags = document.createElement('p');
                playerMaxFrags.textContent = `Max Frags: ${stats.max_frags}`;

                const playerShotsTaken = document.createElement('p');
                playerShotsTaken.textContent = `Shots Taken: ${stats.shots}`;

                const playerDMG = document.createElement('p');
                playerDMG.textContent = `Wins: ${stats.damage_dealt}`;

                const playerBattles = document.createElement('p');
                playerBattles.textContent = `Battles: ${stats.battles}`;

                const playerBattlesSurvived = document.createElement('p');
                playerBattlesSurvived.textContent = `Battles Survived: ${stats.survived_battles}`;

                const playerXP = document.createElement('p');
                playerXP.textContent = `Total XP: ${stats.xp}`;

                const playerMaxXP = document.createElement('p');
                playerMaxXP.textContent = `Max XP: ${stats.max_xp}`;

                const playerHitPercentage = document.createElement('p');
                playerHitPercentage.textContent = `Hit %: ${stats.hits_percents}`;

                card.appendChild(playerWins);
                card.appendChild(playerLosses);
                card.appendChild(playerDraws);
                card.appendChild(playerTotalFrags);
                card.appendChild(playerMaxFrags);
                card.appendChild(playerShotsTaken);
                card.appendChild(playerDMG);
                card.appendChild(playerBattles);
                card.appendChild(playerBattlesSurvived);
                card.appendChild(playerXP);
                card.appendChild(playerMaxXP);
                card.appendChild(playerHitPercentage);
                
                container.appendChild(card);
            });
        } else {
            container.textContent = 'No player stats found.';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        container.textContent = `Error: ${error.message}`;
    }
}*/
