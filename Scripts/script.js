document.addEventListener('DOMContentLoaded', async function () {
    try {
        await getSteamUsers();
        //await fetchUsers();
        //await fetchSuperheroes();
    } catch (error) {
        console.error('An error occurred during initialization:', error);
    }
});

async function getSteamUsers() {
    const container = document.getElementById('steam-users');
    try{
        const response = await fetch('https://www.valvesoftware.com/about/stats');
        if (!response.ok) throw new error(`HTTP Error! Status: ${response.status}`);
        const data = await response.json();

        data.array.forEach(element => {
            const x = document.createElement('p');
            x.textContent = element.users_online;

            container.appendChild(p);
        });
    } catch (error){
        console.error('Fetch error', error);
        container.textContent = `Error: ${error.message || error}`;
    }
}