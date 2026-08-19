/* =====================================================
   SONU.CO — AI PORTFOLIO ENGINE
===================================================== */


/* ================= LOADER ================= */

const loader = document.querySelector(".loader");
const loaderBar = document.querySelector(".loader-bar span");
const loaderPercent = document.querySelector(".loader-percent");

let progress = 0;

const loading = setInterval(() => {

  progress += Math.random() * 8;

  if (progress >= 100) {

    progress = 100;

    clearInterval(loading);

    setTimeout(() => {

      loader.classList.add("hide");

    }, 500);
  }

  loaderBar.style.width = `${progress}%`;

  loaderPercent.textContent =
    `${Math.floor(progress)}%`;

}, 80);


/* ================= CURSOR ================= */

const cursorDot =
  document.querySelector(".cursor-dot");

const cursorRing =
  document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", e => {

  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left =
    `${mouseX}px`;

  cursorDot.style.top =
    `${mouseY}px`;

});


function animateCursor() {

  ringX +=
    (mouseX - ringX) * .12;

  ringY +=
    (mouseY - ringY) * .12;

  cursorRing.style.left =
    `${ringX}px`;

  cursorRing.style.top =
    `${ringY}px`;

  requestAnimationFrame(
    animateCursor
  );

}

animateCursor();


/* Cursor hover */

document
  .querySelectorAll(
    "a, button, .project-card, .skill"
  )
  .forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {
        document.body.classList.add("hovering");
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {
        document.body.classList.remove("hovering");
      }
    );

  });


/* ================= SPOTLIGHT ================= */

const SPOTLIGHT_R = 260;

const revealLayer =
  document.querySelector(".reveal-layer");

const canvas =
  document.getElementById(
    "spotlightCanvas"
  );

const ctx =
  canvas.getContext("2d");

let mouse = {
  x: -999,
  y: -999
};

let smooth = {
  x: -999,
  y: -999
};

let cursorPos = {
  x: -999,
  y: -999
};


function resizeCanvas() {

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

  updateSpotlight();

}


function updateSpotlight() {

  if (!ctx) return;

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const gradient =
    ctx.createRadialGradient(
      cursorPos.x,
      cursorPos.y,
      0,

      cursorPos.x,
      cursorPos.y,
      SPOTLIGHT_R
    );


  gradient.addColorStop(
    0,
    "rgba(255,255,255,1)"
  );

  gradient.addColorStop(
    .4,
    "rgba(255,255,255,1)"
  );

  gradient.addColorStop(
    .6,
    "rgba(255,255,255,.75)"
  );

  gradient.addColorStop(
    .75,
    "rgba(255,255,255,.4)"
  );

  gradient.addColorStop(
    .88,
    "rgba(255,255,255,.12)"
  );

  gradient.addColorStop(
    1,
    "rgba(255,255,255,0)"
  );


  ctx.fillStyle = gradient;

  ctx.beginPath();

  ctx.arc(
    cursorPos.x,
    cursorPos.y,
    SPOTLIGHT_R,
    0,
    Math.PI * 2
  );

  ctx.fill();


  const mask =
    canvas.toDataURL();


  revealLayer.style.maskImage =
    `url(${mask})`;

  revealLayer.style.webkitMaskImage =
    `url(${mask})`;

  revealLayer.style.maskSize =
    "100% 100%";

  revealLayer.style.webkitMaskSize =
    "100% 100%";

}


function animateSpotlight() {

  smooth.x +=
    (mouse.x - smooth.x) * .1;

  smooth.y +=
    (mouse.y - smooth.y) * .1;

  cursorPos.x = smooth.x;
  cursorPos.y = smooth.y;

  updateSpotlight();

  requestAnimationFrame(
    animateSpotlight
  );

}


window.addEventListener(
  "mousemove",
  e => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

  }
);


window.addEventListener(
  "resize",
  resizeCanvas
);

resizeCanvas();

animateSpotlight();


/* ================= MOBILE MENU ================= */

const mobileMenu =
  document.querySelector(".mobile-menu");

const mobileOverlay =
  document.querySelector(".mobile-overlay");

const closeMenu =
  document.querySelector(".close-menu");


mobileMenu.addEventListener(
  "click",
  () => {

    mobileOverlay.classList.add(
      "open"
    );

  }
);


closeMenu.addEventListener(
  "click",
  () => {

    mobileOverlay.classList.remove(
      "open"
    );

  }
);


document
  .querySelectorAll(
    ".mobile-overlay a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileOverlay.classList.remove(
          "open"
        );

      }
    );

  });


/* ================= SCROLL REVEAL ================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: .15
    }

  );


revealElements.forEach(
  element => observer.observe(element)
);


/* ================= MAGNETIC BUTTONS ================= */

document
  .querySelectorAll(".magnetic")
  .forEach(button => {

    button.addEventListener(
      "mousemove",
      e => {

        const rect =
          button.getBoundingClientRect();

        const x =
          e.clientX -
          rect.left -
          rect.width / 2;

        const y =
          e.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform =
          `translate(${x * .18}px,
                     ${y * .18}px)`;

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform =
          "translate(0,0)";

      }
    );

  });


/* ================= PARALLAX ================= */

const codeCards =
  document.querySelectorAll(
    ".code-card"
  );


window.addEventListener(
  "mousemove",
  e => {

    const x =
      (e.clientX / window.innerWidth - .5);

    const y =
      (e.clientY / window.innerHeight - .5);


    codeCards.forEach(
      (card, index) => {

        const strength =
          (index + 1) * 12;

        card.style.transform =
          `translate(
            ${x * strength}px,
            ${y * strength}px
          )`;

      }
    );

  }
);


/* ================= NAV ACTIVE STATE ================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-pill a"
  );


window.addEventListener(
  "scroll",
  () => {

    let current = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop;

      if (
        window.scrollY >=
        sectionTop - 300
      ) {

        current =
          section.getAttribute("id");

      }

    });


    navLinks.forEach(link => {

      link.classList.remove(
        "active"
      );

      if (
        link.getAttribute("href") ===
        `#${current}`
      ) {

        link.classList.add(
          "active"
        );

      }

    });

  }
);


/* ================= KEYBOARD EASTER EGG ================= */

let secretCode = "";

document.addEventListener(
  "keydown",
  e => {

    secretCode +=
      e.key.toLowerCase();

    secretCode =
      secretCode.slice(-8);

    if (
      secretCode === "artificial"
    ) {

      document.body.style.filter =
        "invert(1)";

      setTimeout(() => {

        document.body.style.filter =
          "";

      }, 1000);

      secretCode = "";

    }

  }
);


/* ================= TERMINAL TYPING ================= */

const terminal =
  document.querySelector(
    ".cursor-line"
  );

let terminalActive = true;

setInterval(() => {

  if (!terminalActive) return;

  terminal.style.opacity =
    terminal.style.opacity === "0"
      ? "1"
      : "0";

}, 500);


/* ================= IMAGE TILT ================= */

document
  .querySelectorAll(".project-card")
  .forEach(card => {

    card.addEventListener(
      "mousemove",
      e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          e.clientX - rect.left;

        const y =
          e.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - .5) * -5;

        const rotateY =
          ((x / rect.width) - .5) * 5;

        card.style.transform =
          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          "";

      }
    );

  });