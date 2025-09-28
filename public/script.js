async function getData() {
  const res = await fetch("/api/data");
  const data = await res.json();
  alert("Current data: " + JSON.stringify(data));
}

async function updateData() {
  const res = await fetch("/api/data", { method: "POST" });
  const data = await res.json();
  alert("Updated data: " + JSON.stringify(data));
}
