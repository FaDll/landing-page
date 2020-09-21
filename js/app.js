/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let sectionsIds='';
let UnOrderedList=[];
let anchors=[];
sectionsIds = document.getElementsByTagName("section");
const UnOrderedListID = document.querySelector('#navbar__list');//parent
let current='';
const options={
    root:null,
    threshold: 0.75
};
let observer=new IntersectionObserver(onEntry,options);

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isInViewport()
{
    for(section of sectionsIds)
    {
        observer.observe(section);
    }
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function BuildMenu()
{
for (let i=0; i<sectionsIds.length; i++)
    {
        TempNavData=document.querySelector(`#${sectionsIds[i].id}`);
        UnOrderedList[i] = document.createElement('li');
        Links=document.createElement('a');
        Links.textContent=TempNavData.dataset.nav;
        UnOrderedListID.appendChild(UnOrderedList[i]);
        UnOrderedList[i].appendChild(Links);
        Links.href=`#${sectionsIds[i].id}`;
        Links.classList.add('menu__link');
        anchors[i]=Links;

    }
}

function onEntry(sections) {
    sections.forEach((section) => { 
    
        if(section.isIntersecting)//checks if the section is in the viewport and returns true
        {   
            current=`#${section.target.id}`;//to get the current sectionID and compare it with href attribute and link the section in viewport and the href tab.
            section.target.classList.add('your-active-class');
            for(anchor of anchors)
            {
                if(current===anchor.getAttribute('href'))
                {
                    anchor.classList.add("Link_backGround");
                }
                else
                {
                    anchor.classList.remove("Link_backGround");
                }
            }   
            
        }
        else
        {
            section.target.classList.remove('your-active-class');
            
        }
    });
}
  
// Add class 'active' to section when near top of viewport\
function ViewActiveSection()
{
document.addEventListener('scroll',isInViewport);
}
// Scroll to anchor ID using scrollTO event
function ScrollTo()
{
    for(let anchor of anchors)
    {
        anchor.addEventListener('click',function(event)
        {
            event.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            })
        })
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
BuildMenu();
// Scroll to section on link click
ScrollTo();
// Set sections as active
ViewActiveSection();

