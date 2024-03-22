document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  navegacionFija();
  crearGaleria();
  scrollNav();
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `<picture>
    <source srcset="build/img/thumb/${i}.avif" type="image/avif"/>
    <source srcset="build/img/thumb/${i}.webp" type="image/webp"/>
    <img loading="lazy" height="400" width="400" src="build/img/thumb/${i}.jpg" alt="build/img/thumb/${i}.jpg" />
  </picture>`;
    galeria.appendChild(imagen);
    imagen.onclick = function () {
      mostrarImagen(i);
    };
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `<picture>
      <source srcset="build/img/grande/${id}.avif" type="image/avif"/>
      <source srcset="build/img/grande/${id}.webp" type="image/webp"/>
      <img loading="lazy" height="400" width="400" src="build/img/grande/${id}.jpg" alt="build/img/grande/${id}.jpg" />
    </picture>`;

  //! crea el overlay
  const overlay = document.createElement("div");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    overlay.remove();
    body.classList.remove("fijar-body");
  };

  //! boton para cerrar el modal
  const botonClose = document.createElement("P");
  botonClose.textContent = "X";
  botonClose.classList.add("btn-cerrar");
  overlay.appendChild(botonClose);
  botonClose.onclick = function () {
    const body = document.querySelector("body");
    overlay.remove();
    body.classList.remove("fijar-body");
  };

  //! a;ade al html
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const sectionScroll = e.target.attributes.href.value;
      const section = document.querySelector(sectionScroll);
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function navegacionFija() {
  const barraNavegacion = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().top < 0) {
      barraNavegacion.classList.add("show-nav");
    } else {
      barraNavegacion.classList.remove("show-nav");
    }
  });
}

const otroEnlace = document.querySelector("#inicio");
otroEnlace.setAttribute("style", "cursor: pointer");
otroEnlace.addEventListener("click", function (e) {
  e.preventDefault();
  // const enlaceToScroll = document.querySelector("#video");
  // enlaceToScroll.scrollIntoView({ behavior: "smooth" });
  window.scrollTo({ top: 0, behavior: "smooth" });
});
