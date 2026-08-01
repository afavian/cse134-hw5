const picker = document.querySelector("#theme-picker");
const radios = document.querySelectorAll(
  "input[name='theme']"
);
function applyTheme(theme){
  if(theme === "auto"){
    document.documentElement.removeAttribute(
      "data-theme"
    );
  }
  else{
    document.documentElement.dataset.theme = theme;
  }
}
try{
  const saved = localStorage.getItem("theme");
  if(saved){
    applyTheme(saved);
    document.querySelector(
      `input[value="${saved}"]`
    ).checked = true;
  }
}
catch(error){
  
}
radios.forEach(radio => {
  radio.addEventListener(
    "change",
    (event)=>{
      const theme = event.target.value;
      applyTheme(theme);
      try{
        localStorage.setItem(
          "theme",
          theme
        );
      }
      catch(error){
        
      }
    });
});
