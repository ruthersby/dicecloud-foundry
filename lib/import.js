export default class DicecloudImport extends Application {
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
}