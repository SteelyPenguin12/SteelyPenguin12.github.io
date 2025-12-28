//console.log(`Index.js loaded`);
//console.log(`variable insert into text like this $(variable)`);

//variables
const storageKey = 'theme-preference'; //key for local storage of most recent theme preference
const theme = {
    value: getThemePreference(),
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
const sunIcon = document.getElementById("theme-icon-sun");
const moonIcon = document.getElementById("theme-icon-moon");
const themeButton = document.getElementById("theme-button");

//theme toggle functionality
themeButton.addEventListener("click",function(){
    if (theme.value === 'light'){
        theme.value = 'dark'
        sunIcon.style.setProperty("background-color",themeToggleDisabledColour);
        moonIcon.style.setProperty("background-color",themeToggleEnabledColour);   
    }else{
        theme.value = 'light'
        sunIcon.style.setProperty("background-color",themeToggleEnabledColour);
        moonIcon.style.setProperty("background-color",themeToggleDisabledColour);
    }
    setThemePreference();
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

function getThemePreference() {//figures out what the current theme preference should be
    //checks local storage for saved preference first
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    }
    //then looks at browser/system preference if no local storage preference found
    else{
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        else {
            return 'light';
        }
    }
}
function setThemePreference() { //stores current theme preference to local storage
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
}

//runs on load and sets initial theme
window.onload = () => {
    reflectPreference()

    //auto add onclick to correct buttons based on class
    /* something like this maybe?
    document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick)*/
};

//adds an event listener to detect system theme changes
//when browser preference changes, this also updates the locally stored preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (event) => {
  if (event.matches) {
    // browser switched to dark mode
    console.log("System switched to dark mode!");
    theme.value = 'dark';
    setThemePreference();
  } else {
    // browser switched to light mode
    console.log("System switched to light mode!");
    theme.value = 'light';
    setThemePreference();
  }
  reflectPreference();
});

