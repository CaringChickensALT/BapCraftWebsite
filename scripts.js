async function getServerStatus() {
    try {
        // Fetch server status from the API
        const response = await fetch('https://api.mcsrvstat.us/2/mc.bapcraft.org'); // Replace with your server's IP
        const data = await response.json();

        console.log('API Response:', data); // Log the data for debugging

        // Check if the server is online
        if (data.online) {
            const playerCount = data.players.online;
            const maxPlayers = data.players.max;
            const playerText = `<span style="color: #6cff52; text-shadow: 0 0 10px #6cff52, 0 0 20px #6cff52, 0 0 30px #6cff52, 0 0 40px #6cff52, 0 0 50px #6cff52, 0 0 75px #6cff52, 0 0 100px #6cff52;">${playerCount} / ${maxPlayers} player(s) online</span>`;

            // Check if the element exists before updating
            const playerCountElement = document.getElementById('player-count');
            if (playerCountElement) {
                playerCountElement.innerHTML = playerText;
            } else {
                console.error("Element with ID 'player-count' not found");
            }

            // Check if the player list is available
            if (data.players.list && data.players.list.length > 0) {
                const playerNames = data.players.list;
                let playerListText = 'Player(s) online: <ul>';

                // Create a list of player names
                playerNames.forEach(player => {
                    playerListText += `<li>${player}</li>`;
                });

                playerListText += "</ul>";

                // Display the player names
                const playerNamesElement = document.getElementById('player-names');
                if (playerNamesElement) {
                    playerNamesElement.innerHTML = playerListText;
                } else {
                    console.error("Element with ID 'player-names' not found");
                }
            } else {
                const playerNamesElement = document.getElementById('player-names');
                if (playerNamesElement) {
                    playerNamesElement.innerHTML = "No players currently online.";
                }
            }
        } else {
            const playerCountElement = document.getElementById('player-count');
            if (playerCountElement) {
                playerCountElement.innerHTML = "Server is offline";
            }

            const playerNamesElement = document.getElementById('player-names');
            if (playerNamesElement) {
                playerNamesElement.innerHTML = "";
            }
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        const playerCountElement = document.getElementById('player-count');
        if (playerCountElement) {
            playerCountElement.innerHTML = "Error fetching player count";
        }

        const playerNamesElement = document.getElementById('player-names');
        if (playerNamesElement) {
            playerNamesElement.innerHTML = "";
        }
    }
}

// Run the function to check the server status once the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    getServerStatus();
});
