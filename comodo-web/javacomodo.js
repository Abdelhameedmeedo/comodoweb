    //check on local storage if there main color or no
let mainColor = localStorage.getItem('ul-setting');
if(mainColor !== null){
        //to make current color stable not change when u do refresh
    document.documentElement.style.setProperty('--main-color',mainColor);
        //remove active class from all color li items
    document.querySelectorAll('.ul-setting li').forEach(element =>{
        element.classList.remove('active');
            //add active class on element with data-color === local storage item
        if(element.dataset.color === mainColor){
                //add active class
            element.classList.add('active');
        }
    })

} 


    //background option to flip-flop for (yes) or (no)
let backgroundOption = true;
    //setInterval tank or control background
let backgroundInterval; 

    //local storage background to stob on specific image
let backgroundItem = localStorage.getItem('background-option');
if(backgroundItem !== null){
    if(backgroundItem === true){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

        //remove active class from span
    document.querySelectorAll('.background-option span').forEach(element =>{
        element.classList.remove('active');
    });
    if(backgroundItem === 'true'){
        document.querySelector('.yes').classList.add('active');
    }
    else{
        document.querySelector('.no').classList.add('active');
    }
} 

    //toggle settiing
var iconOpen = document.querySelector('.toggle .fa-cog');
var settingTog = document.querySelector('.setting-box');
iconOpen.onclick = function(){
    iconOpen.classList.toggle('fa-spin');
    settingTog.classList.toggle('open');
};


    //switch colors
const choooseColor = document.querySelectorAll('.ul-setting li');
    //li for iteration
choooseColor.forEach(li =>{
        //add event on li
    li.addEventListener('click',(e) =>{
            //set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
            //set color on local storage
        localStorage.setItem('ul-setting',e.target.dataset.color);
         //remove class active from li item
        e.target.parentElement.querySelectorAll('.active').forEach(element =>{
            element.classList.remove('active');
        })
            //add class active on current li item
        e.target.classList.add('active');
    })
})



    //switch backgrounds option
var chooseBackgroundEl = document.querySelectorAll('.background-option span');
chooseBackgroundEl.forEach(span =>{
    span.addEventListener('click',(e) =>{
            //to remove active class
        e.target.parentElement.querySelectorAll('.active').forEach(element =>{
            element.classList.remove('active');
        });
            //to add active class on current clickable button
        e.target.classList.add('active');
            //contro on (yes) or (no) button to run or stop background image
        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            checkingInterval();
            localStorage.getItem('background-option',true);
        }
        else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.getItem('background-option',false);
        }
    });
});

    //select place to put imageon it
let pageContainer = document.querySelector('.page');
    //arrayImages
let arrayImages = ['joker1.jpg', 'computers.jpg', 'moon.jpg','sea.jpg', 'windows.jpg'];
  
    //setInterval function
function checkingInterval(){
    if(backgroundOption === true){
        backgroundInterval= setInterval(() => {
                //choose random image
            let randomNum = Math.floor(Math.random() * arrayImages.length);
                //set background-image
            pageContainer.style.backgroundImage ='url('+arrayImages[randomNum]+')';
                //seconds to change image
        }, 2000);
    }
}

checkingInterval();

    //skills animation/coding
let skills = document.querySelector('.skills');
window.onscroll = function(){
        //skill offset top
    let skillOffSetTop = skills.offsetTop;
        //skill outer height
    let skillOuterHeight = skills.offsetHeight;
        //skill inerheight
    let windowHeight = this.innerHeight;
        //skill window scroll
    let windowScroll = this.pageYOffset;
    if(windowScroll > (skillOffSetTop + skillOuterHeight - windowHeight)){
        let allSkill = document.querySelectorAll('.skills span');
        allSkill.forEach(skill =>{
            skill.style.width = skill.dataset.progress;
        })
    }
}


    //create gallery
let ourGallery = document.querySelectorAll('.gallery img');
ourGallery.forEach(img =>{
    img.addEventListener('click',(e)=>{
            //create overlay
        let overlay = document.createElement('div');
            //add class to overlay
        overlay.className = 'popup-overlay';
            //include overlay to the html page
        document.body.appendChild(overlay);
            //create popuo itself/box
        let popupItself = document.createElement('div');
            //add class on popup box
        popupItself.className = 'popup-box';
            //create heading fliping by alt
        if(img.alt !== null){
                //create haeding
            let imageTitle = document.createElement('h3');
                //create textnode
            let imageText = document.createTextNode(img.alt);
                //append
            imageTitle.appendChild(imageText);
            popupItself.appendChild(imageTitle);
            
        }
            //create image popup
        let imagePopup = document.createElement('img');
            //set image source
        imagePopup.src = img.src;
            //append        
        popupItself.appendChild(imagePopup);
        document.body.appendChild(popupItself);
            //cretae close btn
        let closeBtn = document.createElement('span');
            //create text node
        let closeText = document.createTextNode('x');
        closeBtn.appendChild(closeText);
            //add class
        closeBtn.className = 'close-btn';
        popupItself.appendChild(closeBtn);
    })
})

    //close popup btn
document.addEventListener('click',(e)=>{
    if(e.target.className == 'close-btn'){
        //remove current popup
        e.target.parentNode.remove();
        //remove popup
        document.querySelector('.popup-overlay').remove();
    }
})