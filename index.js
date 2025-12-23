//console.log(`Index.js loaded`);
//console.log(`variable insert into text like this $(variable)`);

//variables
const theme = {
    value: 'light',
}


const rootElement = document.documentElement;
const computedStyles = window.getComputedStyle(rootElement);
//pulls variables from the css applied to the current html document
const themeToggleEnabledColour = computedStyles.getPropertyValue('--theme-toggle-enabled-colour');
const themeToggleDisabledColour = computedStyles.getPropertyValue('--theme-toggle-disabled-colour');
const primaryLight = computedStyles.getPropertyValue('--primary-light');
const primaryDark = computedStyles.getPropertyValue('--primary-dark');
const secondaryLight = computedStyles.getPropertyValue('--secondary-light');
const secondaryDark = computedStyles.getPropertyValue('--secondary-dark');

//stores refrences to html objects
const sunButton = document.getElementById("theme-button-sun");
const moonButton = document.getElementById("theme-button-moon");

//theme toggle functionality
sunButton.addEventListener("click",function(){
    sunButton.style.setProperty("background-color","white")
    moonButton.style.setProperty("background-color","black")
    theme.value = 'light'

    reflectPreference();
});
moonButton.addEventListener("click",function(){
    moonButton.style.setProperty("background-color","white")
    sunButton.style.setProperty("background-color","black")
    theme.value = 'dark'

    reflectPreference();
});

//functions
function reflectPreference() { //updates css to reflect selected theme preference
    if (theme.value === 'dark'){
        //apply dark mode styles to style.css
        rootElement.style.setProperty("--primary-color",`${primaryDark}`);
        rootElement.style.setProperty("--secondary-color",`${secondaryDark}`);
        console.log("dark mode settings applied");
    }else{
        //apply light mode styles to style.css
        rootElement.style.setProperty("--primary-color",`${primaryLight}`);
        rootElement.style.setProperty("--secondary-color",`${secondaryLight}`);
        console.log("light mode settings applied");
    }
}

//runs on load and sets initial theme
window.onload = () => {
    //checks system preference for light or dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("Dark mode is preferred.");
        theme.value = 'dark';
    } else {
        console.log("Light mode is preferred.");
        theme.value = 'light';
    }
    reflectPreference()

    //auto add onclick to correct buttons based on class
    /* something like this maybe?
    document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick)*/
};

//CONSIDER!!!! whether this is necessary if we already have a button to manually toggle themes
//adds an event listener to detect system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (event) => {
  if (event.matches) {
    // User switched to dark mode
    console.log("System switched to dark mode!");
    theme.value = 'dark';
  } else {
    // User switched to light mode
    console.log("System switched to light mode!");
    theme.value = 'light';
  }
  reflectPreference();
});

