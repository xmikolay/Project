// This event listener holds a bit of code which recognises if the current page you are accessing contains a keyword. 
// With that keyword it loads only the specified function.
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
        console.error('An error occurred during initialization:', error); //Error pops up if website fails to load
    }
});

const MAP_API = 'https://api.worldoftanks.eu/wot/encyclopedia/arenas/?application_id=ad0db27550136ff72d1b4d69ad6603ce';

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');  //Creating a container which will hold all the data we want

app.appendChild(container);

//Function to get player stats
async function getPlayers() {
    const playerName = document.getElementById('playerName').value.trim(); //Getting player name as a variable to use for our API search. Using value.trim to cut out any white space entered by user

    if (!playerName) {
        alert('Please enter a player name.'); //Displays pop up alert anytime website loads up and if no player name is entered into search bar
        return;
    }

    const PLAYER_API = `https://api.worldoftanks.eu/wot/account/list/?application_id=ad0db27550136ff72d1b4d69ad6603ce&search=${playerName}`; //Here is our api and at the end is our previously declared variable
    const container = document.getElementById('resultsPlayer');
    container.innerHTML = ''; 

    try {
        const response = await fetch(PLAYER_API);
        if (!response.ok) throw new Error(`HTTP getting Player Data: ${response.status}`);
        const data = await response.json(); //Declaring "data" variable for our JSON response

        if (data.status == 'ok' && data.data.length > 0) { //Checking if data status is ok and if it isnt empty
            data.data.forEach(player => { //Foreach loop to step through data
                const card = document.createElement('div');
                card.setAttribute('class', 'card');

                const playerName = document.createElement('h3');
                playerName.textContent = `Player: ${player.nickname}`;

                const playerAccountId = document.createElement('p');
                playerAccountId.textContent = `Account ID: ${player.account_id}`;

                //Appending info to our card
                card.appendChild(playerName);
                card.appendChild(playerAccountId);

                //Appending the card to container we made
                container.appendChild(card);
            });
        } else {
            container.textContent = 'No players found.'; //This error shows that there is no players found (JSON file is in incorrect format or empty)
        }
    } catch (error) { //Catches any errors that show up with our function
        console.error('Fetch error:', error);
        container.textContent = `Error: ${error.message}`;
    }
}

//Function to get tank stats by nation
async function getTanks() {
    const nation = document.getElementById('nation').value.trim(); //Getting nation as a variable to use for our API search. Using value.trim to cut out any white space entered by user

    if (!nation) {
        alert('Please enter Nation.'); //Displays pop up alert anytime website loads up and if no nation is entered into search bar
        return;
    }

    const TANK_API = `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=ad0db27550136ff72d1b4d69ad6603ce&nation=${nation}`; //Here is our api and at the end is our previously declared variable
    const container = document.getElementById('results');
    container.innerHTML = ''; 

    try {
        const response = await fetch(TANK_API);
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json(); //Declaring "data" variable for our JSON response

        if (data && data.data) { //Checks if the data object exists and if the data object has a property named data
            Object.values(data.data).forEach(nation => { //Object.values will return an array of values from the data property
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
                
                //Appending info to our card
                card.appendChild(tankImg);
                card.appendChild(tankName);
                card.appendChild(tankType);
                card.appendChild(tankTier);
                card.appendChild(tankDesc);

                //Appending info to our container
                container.appendChild(card);
            });
        } else {
            container.textContent = 'No tanks found / Incorrect nation name.'; //This error shows that there is no tanks or nation found (JSON file is in incorrect format or empty)
        }
    } catch (error) { //Catches any errors that show up with our function
        console.error('Fetch error:', error);
        container.textContent = `Error: ${error.message}`;
    }
}

//Function to get all maps in the game
async function getMaps() {
    try{
        const response = await fetch(`${MAP_API}`); //This time we dont embed the full api here since i declared it earlier. This is because theres no need for extra user input for our API search
        if (!response.ok) throw new error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json(); //Declaring "data" variable for our JSON response

        if (data && data.data) { //Checks if the data object exists and if the data object has a property named data
            Object.values(data.data).forEach(element => { //Object.values will return an array of values from the data property
                const card = document.createElement('div');
                card.setAttribute('class', 'card')
                
                const mapName = document.createElement('h3');
                mapName.textContent = `Name: ${element.name_i18n}`;

                const mapDescription = document.createElement('p');
                mapDescription.textContent = `Description: ${element.description}`;

                const camoType = document.createElement('p');
                camoType.textContent = `Camouflage: ${element.camouflage_type}`;

                //Appending info to our card
                card.appendChild(mapName);
                card.appendChild(mapDescription);
                card.appendChild(camoType);

                //Appending info to our container
                container.appendChild(card);
            });
        } else {
            container.textContent = 'No maps found.'; //This error shows that there is no maps found (JSON file is in incorrect format or empty)
        }
        
    } catch (error){ //Catches any errors that show up with our function
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
