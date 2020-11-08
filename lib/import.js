export default class DicecloudImport extends Application {

  constructor(actor) {
    super();
    this.actor = game.actors.get(actor._id);
  }
  /**
   * Define default options for the PartySummary application
   */
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.title = "Dicecloud";
    options.template = "modules/dicecloud-foundry/templates/dicecloud.html";
    options.width = 800;
    options.height = "auto";
    options.classes = ["dicecloud"];
    return options;
  }

  async getData() {
    return {
      dicecloudurl:this.actor.data.data.dicecloudurl
    };
  }

  import(url) {
    const charURL = new URL(url);
    const characterID = charURL.pathname.split('/')[2];
    const self = this;
    $.get(`https://dicecloud-foundry.herokuapp.com/${characterID}`, (charData)=> {
      self.updateCharacter(charData.characters[0]);
    });
  }

  updateCharacter(characterData) {
    this.actor.update({
      character:{name: characterData.name}
    });
  }
}
Hooks.on('renderDicecloudImport', function(instance, dom, data) {
  console.log("Rendered DicecloudImport");
  
  const url = dom.find("#dicecloudurl").val();
  console.log("charcter url", url);
  
  dom.find("#dicecloudupdate").click(()=> {
    const url = dom.find("#dicecloudurl").val();
    if(!url.startsWith("https://dicecloud.com/character")) {
      alert("url doesn't look like a dicecloud url: https://dicecloud.com/character");
      return;
    }
    instance.import(url);
  })

  dom.find("#dicecloudurl").on("change", (evt)=> {
    instance.actor.update({
      data: {dicecloudurl: evt.currentTarget.value}
    });
  });
});