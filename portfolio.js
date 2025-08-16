// Create audio element once
const typeSound = new Audio("typing.wav");
typeSound.volume = 0.05; // Reduce volume to 20%

const Commands = {
  help: {
    answer: "List of commands: showcase, socials, contributed, goodmessage, bird",
  },
  showcase: {
    answer: "These are showcases of my work:",
    links: {
      "Hood Game Showcase":
        "https://x.com/ZergoScripts/status/1912524221504184374",
      "Loading Screen + Main Menu":
        "https://x.com/ZergoScripts/status/1917748327694885154",
      "First Person Movement System":
        "https://x.com/ZergoScripts/status/1934224305312649569",
      "Combat System in 1 Hour Challenge":
        "https://x.com/ZergoScripts/status/1934467498646306844",
      "Airship System": "https://x.com/ZergoScripts/status/1934467498646306844",
    },
  },
  contributed: {
    answer: "These are showcases of my work:",
    links: {
      "Girls battlegrounds":
        "https://www.roblox.com/games/131918416959711/UPD-Girls-Battlegrounds",
      "Liberty Heights NYC":
        "https://www.roblox.com/games/121863468506169/Liberty-Heights-NYC-BETA",
      "Pet World": "https://www.roblox.com/games/106736884883028/Pet-World",
    },
  },
  socials: {
    answer: "These are my Socials:",
    links: {
      "X/Twitter": "https://x.com/ZergoScripts",
      "Discord Server": "https://discord.gg/hPVqDgCJ",
      "Arbitrage Server": "https://discord.gg/StryGWqb",
    },
  },
  goodmessage: {
    answer: `Free Schlep!`,
  },
  bird: {
    answer: `𓅪`,
  },
};

let typing = false;

// Typewriter effect function
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";
  return new Promise((resolve) => {
    function type() {
      typing = true;

      if (i < text.length) {
        element.textContent += text.charAt(i);
        // Play a clone of the typing sound with random pitch
        const soundClone = typeSound.cloneNode();
        // Random playback rate between 0.8 and 1.2 for slight pitch variation
        soundClone.playbackRate = 0.8 + Math.random() * 1;
        soundClone
          .play()
          .catch((err) => console.log("Audio play failed:", err));
        i++;
        setTimeout(type, speed);
      } else {
        typing = false;
        resolve();
      }
    }
    type();
  });
}

async function EnterCommand() {
  const inputElement = document.getElementById("userInput");
  const userInput = inputElement.value.toLowerCase();
  inputElement.id = "usedUserInput";

  // Disable the input and remove focus
  inputElement.disabled = true;

  if (typing) {
    return;
  }

  if (userInput.length !== 0) {
    if (Commands[userInput]) {
      const divElement = document.createElement("div");
      divElement.className = "InputHolder";

      const pElement = document.createElement("p");
      divElement.appendChild(pElement);
      document.body.appendChild(divElement);

      // Type out the system message
      await typeWriter(pElement, ">System>: " + Commands[userInput].answer);

      if (Commands[userInput].links) {
        // If there are links, display them with typewriter effect
        for (const [title, url] of Object.entries(Commands[userInput].links)) {
          const linkContainer = document.createElement("div");
          linkContainer.className = "link-item";

          const linkElement = document.createElement("a");
          linkElement.href = url;
          linkElement.target = "_blank";

          linkContainer.appendChild(linkElement);
          divElement.appendChild(linkContainer);

          // Type out the link text
          await typeWriter(linkElement, title);
        }
      }
    } else {
      // Create elements for unknown command message
      const divElement = document.createElement("div");
      divElement.className = "InputHolder";

      const pElement = document.createElement("p");
      divElement.appendChild(pElement);
      document.body.appendChild(divElement);

      // Type out the error message
      await typeWriter(
        pElement,
        ">System>: Command not found. Type 'help' for available commands."
      );
    }
  }

  // Clone the parent element and all its contents
  const parentElement = inputElement.parentElement;
  const clonedParent = parentElement.cloneNode(true);

  // Find the input element inside the cloned parent and set it up
  const clonedInput = clonedParent.querySelector("input");
  if (clonedInput) {
    clonedInput.id = "userInput"; // Set the correct ID for the new input
    clonedInput.value = ""; // Clear the value
    clonedInput.disabled = false; // Make sure it's enabled
  }

  document.body.appendChild(clonedParent);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Add your code here for what should happen when Enter is pressed
    EnterCommand();
    // console.log('Enter key was pressed!');
  }
});
