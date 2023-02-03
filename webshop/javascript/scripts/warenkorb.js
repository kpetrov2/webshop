let warenkorbStatus = document.getElementById("warenkorbStatus");
let warenkorbContainer = document.getElementById("warenkorbContainer");
let warenkorb = JSON.parse(localStorage.getItem("produkten")) || [];

let warenkorbMenge = () => {
  let warenMenge = document.getElementById("warenMenge");
  warenMenge.innerHTML = warenkorb.map((produkt)=>produkt.menge).length;
};

warenkorbMenge();

let warenkorbInfo = () => {
  if(warenkorb.length !==0) {
    return warenkorbContainer.innerHTML = warenkorb.map((warenkorbProdukt)=> 
    {
      let produktSuche = produktenData.find((produkt)=> produkt.id === warenkorbProdukt.id) || [];
      return `
      <div id=${warenkorbProdukt.id} class="produktInWarenkorb">
        <img class="bildWarenkorb" width="100" height="100" src=${produktSuche.img} alt="Bild des Produkts">
        <div class="info">
          <div class="elementeKauf">
            <h4 class="titelPreis">
              <p>${produktSuche.name}</p>
              <p class="produktWarenkorbPreis">${produktSuche.price}€</p>
            </h4>
            <i onclick="produktEntfernen(${warenkorbProdukt.id})" class="bi bi-x-circle"></i>
          </div>
          <p class="infoKauf">${produktSuche.desc}</p>
          <div class="warenkorbButtons"></div>
          <h3></h3>
        </div>
      </div>`;
    }).join("");
  } else {
    warenkorbStatus.innerHTML = `
    <h2>Rechnungsadresse</h2>
    <form>
      <label for="namen">&nbsp;Namen</label><br>
      <input type="text" id="namen" name="namen" value="" disabled/>
    </form>
    <form>
      <label for="telnum">&nbsp;Telefonnummer</label><br>
      <input type="text" id="telnum" name="telnum" value="" disabled/>
    </form>
    <form>
      <label for="strasse">&nbsp;Straße und Hausnummer</label><br>
      <input type="text" id="strasse" name="strasse" disabled/>
    </form>
    <form>
      <label for="zusatz">&nbsp;Adresszusatz</label><br>
      <input type="text" id="zusatz" name="zusatz" disabled/>
    </form>
    <form>
      <label for="plz">&nbsp;Postleitzahl</label><br>
      <input type="text" id="plz" name="plz" disabled/>
    </form>
    <form>
      <label for="stadt">&nbsp;Stadt</label><br>
      <input type="text" id="stadt" name="stadt" disabled/>
    </form>
    <form>
      <label for="land">&nbsp;Land</label><br>
      <input type="text" id="land" name="land" disabled/>
    </form>
    <h3>Bitte bestellen Sie etwas, bevor Sie Ihre Kaufdaten eingeben</h3>
    `;
    warenkorbContainer.innerHTML = `
    <h3>Warenkorb ist leer</h3>
    <a href="startseite.html">
      <button class="startseiteButton">Zurück zur Startseite</button>
    </a>`; 
  }
};

warenkorbInfo();

let produktEntfernen = (id)=> {
  let ausgewaehlteProdukt = id;
  warenkorb = warenkorb.filter((warenkorbProdukt)=>warenkorbProdukt.id !== ausgewaehlteProdukt.id);
  warenkorbInfo();
  warenkorbMenge();
  gesamtBetrag();
  localStorage.setItem("produkten", JSON.stringify(warenkorb));
};

let warenkorbLeeren = () => {
  warenkorb = [];
  warenkorbInfo();
  warenkorbMenge();
  gesamtBetrag();
  localStorage.setItem("produkten", JSON.stringify(warenkorb));
}

let gesamtBetrag = () => {
    if(warenkorb.length !==0) {
    let betrag = warenkorb.map((warenkorbProdukt)=>{
      let produktSuche = produktenData.find((produkt)=> produkt.id === warenkorbProdukt.id) || [];
      return produktSuche.price;
    }).reduce((a,b)=>a+b, 0);
    warenkorbStatus.innerHTML = `
    <h2>Lieferadresse</h2>
    <form>
      <label for="namen">&nbsp;Namen</label><br>
      <input type="text" id="namen" name="namen" placeholder="Schreiben Sie alle Ihre Namen" value=""/>
    </form>
    <form>
      <label for="telnum">&nbsp;Telefonnummer</label><br>
      <input type="text" id="telnum" name="telnum" value=""/>
    </form>
    <form>
      <label for="strasse">&nbsp;Straße und Hausnummer</label><br>
      <input type="text" id="strasse" name="strasse" value=""/>
    </form>
    <form>
      <label for="zusatz">&nbsp;Adresszusatz</label><br>
      <input type="text" id="zusatz" name="zusatz" value=""/>
    </form>
    <form>
      <label for="plz">&nbsp;Postleitzahl</label><br>
      <input type="text" id="plz" name="plz" value=""/>
    </form>
    <form>
      <label for="stadt">&nbsp;Stadt</label><br>
      <input type="text" id="stadt" name="stadt" value=""/>
    </form>
    <form>
      <label for="land">&nbsp;Land</label><br>
      <input type="text" id="land" name="land" value=""/>
    </form>
    <h3>Gesamtbetrag:  ${betrag}€</h3>
    <button onclick="bestellung()" class="bestellen" id="gesamtbetrag" value="${betrag}">Jetzt kostenpflichtig bestellen</button>
    <button onclick="warenkorbLeeren()" class="leeren">Korb leeren</button>
    `;
    } else {return;}
};

gesamtBetrag();

let bestellung = () => {
  let namen = document.getElementById("namen").value;
  let telnum = document.getElementById("telnum").value;
  let strasse = document.getElementById("strasse").value;
  let zusatz = document.getElementById("zusatz").value;
  let plz = document.getElementById("plz").value;
  let stadt = document.getElementById("stadt").value;
  let land = document.getElementById("land").value;
  let preis = document.getElementById("gesamtbetrag").value;
  let infoBestellung = JSON.parse(localStorage.getItem("produkten")) || [];

  infoBestellung.push(namen, telnum, preis, zusatz, strasse, plz, stadt, land);

  let datei = new Blob([JSON.stringify(infoBestellung)],{type:"text"});

  let linkDatei = document.createElement("a");
  linkDatei.href = URL.createObjectURL(datei);
  linkDatei.download = "bestellung.txt";
  linkDatei.click();
  warenkorbLeeren();
  alert("Vielen Dank für Ihre Bestellung bei schARfensTein! Wir hoffen, dass Sie uns bald wieder besuchen werden.");
}
