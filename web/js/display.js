

function createRow(container, studentName, samples) {
  const row = document.createElement("div");
  container.appendChild(row);

  const rowLabel = document.createElement("div");
  rowLabel.innerHTML = studentName;
  rowLabel.classList.add("rowLabel");
  row.appendChild(rowLabel);

  for (let sample of samples) {
    const { id, label, student_id } = sample;
    const div = document.createElement("div");
    const img = document.createElement("img");
    const titel = document.createElement("span");
    div.id = "sample_" + id;
    div.classList = "sampleContainer";
    titel.innerHTML = label;
    img.src = constants.IMG_DIR + `/${id}.png`;
    img.classList.add("thump");
    if(utils.flaggedUsers.includes(student_id)) {
      img.classList.add("blur");
    }
    div.appendChild(titel);
    div.appendChild(img);
    row.appendChild(div);
  }
}

function handleClick(sample) {
  const el = document.getElementById("sample_" + sample.id);
  el.classList.add("emphasize");
}
