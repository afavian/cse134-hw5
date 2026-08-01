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
    clearTimeout(this.timeout);
  }
  attributeChangedCallback(name, oldValue, newValue){
    if(oldValue !== newValue){
      this.loadWeather();
    }
  }
  renderIdle(){
    this.setAttribute("state", "idle");
    this.textContent = "Weather information has not loaded yet.";
  }
  renderLoading(){
    this.setAttribute("state", "loading");
    this.textContent = "Loading weather information...";
  }
  renderError(message){
    this.setAttribute("state", "error");
    this.replaceChildren();
    const p = document.createElement("p");
    p.textContent = message;

    const button = document.createElement("button");
    button.textContent = "Try Again";
    button.addEventListener(
      "click", 
      () => this.loadWeather());
    this.append(
      p, 
      button);
  }
  renderSuccess(data){
    this.setAttribute("state", "ready");
    this.replaceChildren();
    const heading = document.createElement("h2");
    heading.textContent = `Weather for ${this.getAttribute("location")}`;
    const list = document.createElement("ul");
    const temperature = document.createElement("li");
    temperature.textContent = `Temperature: ${data.current.temperature_2m}°C`;
    const wind = document.createElement("li");
    wind.textContent = `Wind: ${data.current.wind_speed_10m} km/h`;
    list.append(
      temperature,
      wind
    );
    this.append(
      heading,
      list
    );
  }
  async loadWeather() {
    this.renderLoading();
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    const signal = this.controller.signal;
    this.timeout = setTimeout(() => {
      this.controller.abort();
    }, 5000);
    try {
      //used AI for this part
      const url = "https://api.open-meteo.com/v1/forecast?latitude=32.7157&longitude=-117.1611&current=temperature_2m,wind_speed_10m";
      const response = await fetch(
        url,
        { signal });
      if (!response.ok) {
        throw new Error(
          "Weather request failed");
      }
      const data = await response.json();
      clearTimeout(this.timeout);
      this.renderSuccess(data);
    }
    catch(error) {
      clearTimeout(this.timeout);
      if(error.name === "AbortError") {
        this.renderError(
          "Weather request timed out.");
      }
      else {
        this.renderError(
          "Unable to load weather data.");
      }
    }
  }
}
customElements.define(
  "weather-widget",
  WeatherWidget
);
