let warenkorb = JSON.parse(localStorage.getItem("produkten")) || [];

let warenkorbMenge = () => {
  let warenMenge = document.getElementById("warenMenge");
  warenMenge.innerHTML = warenkorb.map((produkt)=>produkt.menge).length;
};

warenkorbMenge();