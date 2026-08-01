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
    this.setAttribute("state", "loading");
    const template = document.querySelector("#weather-template");
    const clone = template.content.cloneNode(true);
    const title = clone.querySelector(".weather-title");
    const description = clone.querySelector(".weather-description");
    const temperature = clone.querySelector(".weather-temperature");
    title.textContent = 'Weather for ${this.getAttribute("location")};
    description.textContent = "Loading...";
    temperature.textContent = "";
    this.replaceChildren(clone);
  }
}
customElements.define(
  "weather-widget",
  WeatherWidget
);
