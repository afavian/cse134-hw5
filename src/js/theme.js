const picker = document.querySelector("#theme-picker");
const radios = document.querySelectorAll("input[name='theme']");
function applyTheme(theme){
  if(theme === "auto"){
    document.documentElement.removeAttribute("data-theme");
  } else{
    document.documentElement.dataset.theme = theme;
  }
}
function saveTheme(theme){
  try{
    localStorage.setItem("theme", theme);
  } catch(error){
    console.log("localStorage unavailable");
  }
}
function loadTheme(){
  try {
    const saved = localStorage.getItem("theme");
    if(saved){
      applyTheme(saved);
      const selected = document.querySelector('input[value="${saved}"]');
      if(selected){
        selected.checked = true;
      }
    } 
  }catch(error){
      console.log("Could not load theme");
  }
}
if(picker) {
  radios.forEach(radio)=>{
    radio.addEventListener("change",(event) => {
        const theme = event.target.value;
        applyTheme(theme);
        saveTheme(theme);
      });
  });
}
loadTheme();
