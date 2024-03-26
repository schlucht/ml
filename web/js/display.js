function createRow(container, studentName, samples) {
  const row = document.createElement("div");
  container.appendChild(row);

  const rowLabel = document.createElement("div");
  rowLabel.innerHTML = studentName;
  rowLabel.classList.add("rowLabel");
  row.appendChild(rowLabel);

  for (let sample of samples) {
    const { id, label } = sample;
    const div = document.createElement("div");
    const img = document.createElement("img");
    const titel = document.createElement("span");
    div.classList = "sampleContainer";
    titel.innerHTML = label;
    img.src = constants.IMG_DIR + `/${id}.png`;
    img.classList.add("thump");
    div.appendChild(titel);
    div.appendChild(img);
    row.appendChild(div);
  }
}