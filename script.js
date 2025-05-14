const gallery = document.getElementById("gallery");

const customTitles = {
  "dex.txt": "DEX",
  "archigrad.txt": "archigrad",
  "masterslave.txt": "DEX – Master / Slave",
  "a-shopping-plague.txt": "A Shopping Plague",
  "masterplan.txt": "Masterplan Competition Belgium"
};

fetch("files.json")
  .then(res => res.json())
  .then(files => {
    files.forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      const card = document.createElement("div");
      card.className = "project-card";

      if (["jpg", "jpeg", "png"].includes(ext)) {
        card.innerHTML = `
          <img src="${file.path}" alt="${file.name}" />
        `;
        gallery.appendChild(card);
      } else if (ext === "pdf") {
        card.innerHTML = `
          <a href="${file.path}" target="_blank">
            <p>📄 ${file.name}</p>
          </a>
        `;
        gallery.appendChild(card);
      } else if (ext === "txt") {
        fetch(file.path)
          .then(res => res.text())
          .then(embedCode => {
            const title = customTitles[file.name] || "";
            card.innerHTML = `
              <div class="embed-wrapper">${embedCode}</div>
              ${title ? `<h3>${title}</h3>` : ""}
            `;
            gallery.appendChild(card);
          })
          .catch(() => {
            card.innerHTML = `<p>Error loading ${file.name}</p>`;
            gallery.appendChild(card);
          });
      }
    });
  })
  .catch(error => {
    console.error("Failed to load files.json:", error);
  });
