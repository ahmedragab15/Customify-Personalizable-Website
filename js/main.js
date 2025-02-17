//? change hero section background
let heroSection = document.querySelector("#hero");
let backgrounds = [
    "imgs/a10.jpg",
    "imgs/a11.jpg",
    "imgs/a12.jpg",
    "imgs/a13.jpg",
    "imgs/a14.jpg",
    "imgs/a15.jpg",
    "imgs/a16.jpg",
    "imgs/a17.jpg",
    "imgs/a18.jpg",
    "imgs/a19.jpg",
    "imgs/a20.jpg",
];
let backgroundOption = true;
let randomize;

function randomBackground() {
    if (backgroundOption === true) {
        randomize = setInterval(() => {
            heroSection.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]
                })`;
        }, 3000);
    }
}
randomBackground();

//? toggle settings box
document.querySelector(".toggle-settings i").addEventListener("click", (e) => {
    document.querySelector(".settings-box").classList.toggle("open");
    e.target.classList.toggle("fa-spin");
    e.target.parentElement.classList.toggle("open");
});

//? change main color
let colorLis = document.querySelectorAll(".colors li");
colorLis.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
        localStorage.setItem("mainColor", e.target.dataset.color);
    });
});

//? play or stop random background
let randomBgBtns = document.querySelectorAll(".random-backgrounds button");
randomBgBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomBackground();
            localStorage.removeItem("specificBG")
        } else {
            backgroundOption = false;
            clearInterval(randomize);
        }
        localStorage.setItem("BGOption", e.target.dataset.background);

    });
});

//? select specific background
let BgImgs = document.querySelectorAll(".mini-bg img")

BgImgs.forEach((img) => {
    img.addEventListener("click", (e) => {
        heroSection.style.backgroundImage = `url(imgs/${e.target.dataset.bgselect})`
        backgroundOption = false;
        clearInterval(randomize);

        document.querySelectorAll(".random-backgrounds button").forEach((element) => {
            element.classList.remove("active");
            if (element.dataset.background === "no") {
                element.classList.add("active");
            }
        });
        localStorage.setItem("BGOption", "no");
        localStorage.setItem("specificBG", e.target.dataset.bgselect)
    })
})

//? nav scroll on & off
let header = document.querySelector("header")

document.querySelectorAll(".Nav-scrolling button").forEach((btm) => {
    btm.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");

        if (e.target.dataset.scrolling === "off") {
            header.classList.add("absolutenav")
        } else {
            header.classList.remove("absolutenav")
        }
        localStorage.setItem("scrollOpt", e.target.dataset.scrolling);
    })
})

//? skills on scroll
let skillsSec = document.querySelector("#skills")

window.onscroll = function () {
    let skillsOffsetTop = skillsSec.offsetTop;
    let skillsOuterHeight = skillsSec.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = window.scrollY;

    let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight) - 500) {
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        })
    } else {
        allSkills.forEach((skill) => {
            skill.style.width = "0";
        })
    }
}

//? gallery
let gallery = document.querySelectorAll(".imgs-box img")
let overlay = document.createElement("div")
let popupImg = document.createElement("div")

gallery.forEach((img) => {
    img.addEventListener("click", () => {
        overlay.classList.add("gallery-overlay")
        popupImg.classList.add("popup-img")
        popupImg.innerHTML = `            
            <h3>${img.alt}</h3>
            <img src="${img.src}" alt="space-image">
            <span class="close-gallery" >x</span>
            `
        document.body.append(overlay, popupImg)
    })
})

document.addEventListener("click", (e) => {
    if (e.target.className === "close-gallery") {
        overlay.remove()
        popupImg.remove()
    } if (e.target.className == 'gallery-overlay') {
        overlay.remove()
        popupImg.remove()
    }
})

//? bullets
let navBullets = document.getElementById("nav-bullets")

let bullets = document.querySelectorAll("#nav-bullets .bullet")
bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        })
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active")
        })
        e.target.classList.add("active")
    })
})

document.querySelectorAll(".Show-bullets button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");

        if (e.target.dataset.bullets === "no") {
            navBullets.classList.add("hidebullets")
        } else {
            navBullets.classList.remove("hidebullets")
        }
        localStorage.setItem("showBullets", e.target.dataset.bullets);
    })
})

//? reset settings
document.querySelector(".resetBtn").addEventListener("click", (e) => {
    localStorage.clear()
    window.location.reload()
})

//? show menu bars
let navlist = document.querySelector("header ul")
let openmenuBars = document.querySelector(".menu-bars .open")
let closemenuBars = document.querySelector(".menu-bars .close")


openmenuBars.addEventListener("click", () => {
    navlist.classList.add("open")
    openmenuBars.style.display = "none"
    closemenuBars.style.display = "block"
})

function closenav() {
    navlist.classList.remove("open")
    closemenuBars.style.display = "none"
    openmenuBars.style.display = "block"
}

closemenuBars.addEventListener("click", () => {
    closenav()
})

document.addEventListener("click", (e) => {
    if (e.target !== openmenuBars && e.target !== navlist) {
        if (navlist.classList.contains("open")) {
            closenav()
        }
    }
})

//? change font family
let fonts = document.querySelectorAll(".choose-font button");

fonts.forEach((font) => {
    font.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-font", e.target.dataset.font);
        e.target.parentElement.querySelectorAll(".active").forEach((element) => {
            element.classList.remove("active");
        });
        e.target.classList.add("active");
        localStorage.setItem("mainFont", e.target.dataset.font);
    });
});

//!load from localstorage
function loadLocalstorage() {
    //*load stored color
    let storedColor = localStorage.getItem("mainColor");
    if (storedColor) {
        document.documentElement.style.setProperty("--main-color", storedColor);
    }
    //*load active color
    document.querySelectorAll(".colors li").forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.color === storedColor) {
            element.classList.add("active");
        }
        else if (storedColor == null) {
            document.querySelector(".colors li").classList.add("active")
        }
    });
    //*load stored BGOption
    let storedBGOption = localStorage.getItem("BGOption");
    if (storedBGOption === "no") {
        backgroundOption = false;
        clearInterval(randomize);
    }
    //*load active BGOption
    document.querySelectorAll(".random-backgrounds button").forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.background === storedBGOption) {
            element.classList.add("active");
        }
        else if (storedBGOption == null) {
            document.querySelector(".random-backgrounds button").classList.add("active")
        }
    });
    //*load stored BG
    let storedBG = localStorage.getItem("specificBG")
    if (storedBG) {
        heroSection.style.backgroundImage = `url(imgs/${storedBG})`
        backgroundOption = false;
        clearInterval(randomize);
    }
    //*load stored ScrollOpt   
    let storedScrollOpt = localStorage.getItem("scrollOpt")
    if (storedScrollOpt === "off") {
        header.classList.add("absolutenav")
    }
    //*load active ScrollOpt
    document.querySelectorAll(".Nav-scrolling button").forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.scrolling === storedScrollOpt) {
            element.classList.add("active");
        } else if (storedScrollOpt == null) {
            document.querySelector(".Nav-scrolling button").classList.add("active");
        }
    });
    //*load bullets
    let storedshowBullets = localStorage.getItem("showBullets")
    if (storedshowBullets === "no") {
        navBullets.classList.add("hidebullets")
    } else {
        navBullets.classList.remove("hidebullets")
    }
    //*load active ScrollOpt
    document.querySelectorAll(".Show-bullets button").forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.bullets === storedshowBullets) {
            element.classList.add("active");
        }
        else if (storedshowBullets == null) {
            document.querySelector(".Show-bullets button").classList.add("active");
        }
    });
    //*load stored Font
    let storedFont = localStorage.getItem("mainFont");
    if (storedFont) {
        document.documentElement.style.setProperty("--main-font", storedFont);
    }
    //*load active Font
    document.querySelectorAll(".choose-font button").forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.font === storedFont) {
            element.classList.add("active");
        }
        else if (storedFont == null) {
            document.querySelector(".choose-font button").classList.add("active")
        }
    });

} loadLocalstorage();