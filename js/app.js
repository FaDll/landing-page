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
let current='';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isInViewport(e)
{
    let section = e.getBoundingClientRect();//returns the size of the element relative to the viewport
    return (
        section.top >= 0 &&
        section.left >= 0 &&
        section.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        section.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
sectionsIds = document.getElementsByTagName("section");
const UnOrderedListID = document.querySelector('#navbar__list');//parent

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

function AddActiveSection()
{
    for(section of sectionsIds)
    {
        if (isInViewport(section))
        {
            current=`#${section.id}`;//to get the current sectionID and compare it with href attribute and link the section in viewport and the href tab.
            section.classList.add("your-active-class");
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
            section.classList.remove("your-active-class");

        }
    }
}


// Add class 'active' to section when near top of viewport\
function ViewActiveSection()
{
document.addEventListener('scroll',AddActiveSection);
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

