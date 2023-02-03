let katalog = document.getElementById("katalog");
let warenkorb = JSON.parse(localStorage.getItem("produkten")) || [];
let verfugbareProdukte = produktenData.filter(array => warenkorb.every(filter => (!(filter.id === array.id))));


let produktErstellen = (liste) => {
  return (katalog.innerHTML = liste.map((produkt)=>{ 
    return (
    `<div id=${produkt.id} class="produkt">
      <div class="bild">
        <img width="300" height="300" src=${produkt.img} alt="Bild des Produkts">
      </div>
      <div class="inhalt">
        <div class="titel"><h4>${produkt.name}</h4>
        <p>${produkt.desc}</p></div>
        <div class="preis">${produkt.price}€<button id="button" class="kaufen"><i onclick="inWarenkorb(${produkt.id},${produkt.price})" class="bi bi-cart-plus"></i></button></div> 
      </div>
    </div>` ) }).join(""));
};

produktErstellen(verfugbareProdukte);

let inWarenkorb = (id, price) => {
  let ausgewaehlteProdukt = id;
  let produktSuchen = warenkorb.find((produkt)=> produkt.id === ausgewaehlteProdukt.id);

  if(produktSuchen === undefined) {
    warenkorb.push({
      id: ausgewaehlteProdukt.id,
      price: price,
      menge: 1,
    });
    document.getElementById(ausgewaehlteProdukt.id).style.display = "none";
  } else {return;}
  localStorage.setItem("produkten", JSON.stringify(warenkorb));
  warenkorbMenge();
};

let warenkorbMenge = () => {
  let warenMenge = document.getElementById("warenMenge");
  warenMenge.innerHTML = warenkorb.map((produkt)=>produkt.menge).length;
};

warenkorbMenge();

let input = document.getElementById("searchField");
let suchArray = [];

input.addEventListener("keyup", (e) => {
  let suchString = e.target.value.toLowerCase();
  console.log(suchString);
  verfugbareProdukte = verfugbareProdukte.filter(array => warenkorb.every(filter => (!(filter.id === array.id))));
  let suchProdukte = verfugbareProdukte.filter((produkt) => {
    return (produkt.name.toLowerCase().includes(suchString));
  });
  produktErstellen(suchProdukte);
});




