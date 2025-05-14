const gallery = document.getElementById("gallery");

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
          <p>${file.name}</p>
        `;
      } else if (ext === "pdf") {
        card.innerHTML = `
          <a href="${file.path}" target="_blank">
            <p>📄 ${file.name}</p>
          </a>
        `;
      } else if (ext === "txt") {
        card.innerHTML = `
          <a href="${file.path}" target="_blank">
            <p>📝 ${file.name}</p>
          </a>
        `;
      }

      gallery.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to load files.json:", error);
  });
