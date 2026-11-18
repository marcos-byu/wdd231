const url = "data/members.json";
const membersDiv = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

function getLevel(level) {
    if (level === 3) {
        return "Gold";
    } else if (level === 2) {
        return "Silver";
    } else {
        return "Member";
    }
}

function displayMembers(members) {
    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member");

        card.innerHTML = `
            <div class="card-top">
                <h2>${member.name}</h2>
                <p class="tagline">${member.tagline}</p>
            </div>
            <div class="card-body">
                <img src="images/${member.image}" alt="${member.name} logo" width="100" height="100" loading="lazy">
                <div class="card-info">
                    <p><strong>EMAIL:</strong> ${member.email}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a></p>
                    <p><strong>ADDRESS:</strong> ${member.address}</p>
                    <p><strong>LEVEL:</strong> ${getLevel(member.membership)}</p>
                </div>
            </div>
        `;

        membersDiv.appendChild(card);
    });
}

async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not load members.json");
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.log(error);
    }
}

gridButton.addEventListener("click", () => {
    membersDiv.classList.add("grid");
    membersDiv.classList.remove("list");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    membersDiv.classList.add("list");
    membersDiv.classList.remove("grid");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

getMembers();
