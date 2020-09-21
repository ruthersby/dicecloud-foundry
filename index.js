
import DiceCloud from "./lib/import.js";
console.log("ruthersby load");

Hooks.on("init", function() {
  console.log("ruthersby init");
});

Hooks.on("ready", function() {
  console.log("ruthersby ready");
  let pcCharacters = Object.values(CONFIG.Actor.sheetClasses.character).map(s=>s.cls.name);
  pcCharacters.forEach(sheet => {
      Hooks.on('render'+sheet, (app, html, data) => {
          let button = $('<button type="button" id="dicecloud-config" class="dicecloud"/>');
          $(html).find('.window-title').after(button);

          button.click(()=> {
            let characterImport = new DiceCloud(data.actor);
            characterImport.render(true);
            return true;
          })
      });
  });
});