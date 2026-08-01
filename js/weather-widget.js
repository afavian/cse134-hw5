class WeatherWidget extends HTMLElement {
  static observedAttributes = ["location"];
  constructor(){
    super();
    this.controller = null;
  }
  connectedCallback(){
    this.loadWeather();
  }
  disconnectedCallback(){
    if(this.controller){
      this.controller.abort();
    }
  }
  attributeChangedCallback(name, oldValue, newValue){
    if(oldValue !== newValue){
      this.loadWeather();
    }
  }
  async loadWeather(){
    
  }
}
customElements.define(
  "weather-widget",
  WeatherWidget
);
