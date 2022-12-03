const root = document.getElementById("root");
const h1 = document.createElement("h1");

h1.innerText = "Hello World!";
h1.id = "heading";
h1.className = "heading";
Object.assign(h1.style, {
  color: "red",
});

root.appendChild(h1);
