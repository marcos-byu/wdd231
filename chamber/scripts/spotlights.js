const membersUrl = "data/members.json";
const spotlights = document.querySelector("#spotlights");

function getLevelName(level) {
    if (level === 3) {
        return "Gold Member";
    } else {
        return "Silver Member";
    }
}

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error("Could not load members.json");
        }
        const data = await response.json();

        // only gold (3) and silver (2) members
        const goldSilver = data.filter((member) => member.membership >= 2);

        // shuffle the list and get 3
        goldSilver.sort(() => Math.random() - 0.5);
        displaySpotlights(goldSilver.slice(0, 3));
    } catch (error) {
        spotlights.innerHTML = "<p>Spotlights not available</p>";
    }
}

function displaySpotlights(members) {
    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("spotlight");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline}</p>
            <img src="images/${member.image}" alt="${member.name} logo" width="100" height="100" loading="lazy">
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>ADDRESS:</strong> ${member.address}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a></p>
            <p class="level">${getLevelName(member.membership)}</p>
        `;

        spotlights.appendChild(card);
    });
}

getSpotlights();
