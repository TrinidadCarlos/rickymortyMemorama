import { Funcs } from "./funcsClass.js";
import { LevelProcess } from "./LevelClass.js";
import { GetApiClass } from "./getApiClass.js";
import { CardsClass } from "./cardsClass.js";

const funcs = new Funcs();
const levelProcess = new LevelProcess();
const getApiClass = new GetApiClass();
const cardsClass = new CardsClass();

const {
  getById,
  isNil,
  isEmptyArr,
  isEmptyObj,
  makeConfetti,
  generateRandomIds,
} = funcs;

// INICIA EL PROCESO
let levelSelected = "";
let btnStartGame = null;
const cardsQty = {
  easy: 6,
  medium: 10,
  difficult: 20,
};
let timer = 0;

const addBtnsEvetns = (buttons = []) => {
  buttons.forEach((btn) => {
    if (isNil(btn.element) === false) {
      btn.element.addEventListener("click", () => {
        levelSelected = btn.levelBtn;

        const noticeContainer = getById("levelImageContainer");

        if (isNil(noticeContainer) === false) {
          const imgContainer = noticeContainer.children[0]; // tag img
          const textContainer = noticeContainer.children[1];

          imgContainer.setAttribute("src", `./assets/img/${btn.img}`);
          textContainer.textContent = btn.msg;
          noticeContainer.classList.remove("d-none");

          let confettiProps = {
            particleCount: 0,
            spread: 360,
            originY: 0,
            startVelocity: 30,
          };

          if (btn.levelBtn === "easy") {
            confettiProps.particleCount = 20;
          } else if (btn.levelBtn === "medium") {
            confettiProps.particleCount = 40;
            confettiProps.originY = 1;
          } else if (btn.levelBtn === "difficult") {
            confettiProps.particleCount = 150;
            confettiProps.spread = 180;
            confettiProps.originY = 0.5;
            confettiProps.startVelocity = 100;
          }

          makeConfetti(confettiProps);

          setTimeout(() => {
            btnStartGame.click();
          }, 1000);
        }
      });
    }
  });
};

const showHideLoaderCharacters = (show = false) => {
  const getCharactersContainer = getById("getCharactersContainer");
  if (isNil(getCharactersContainer) === false) {
    if (show === true) {
      getCharactersContainer.classList.remove("d-none");
    } else {
      getCharactersContainer.classList.add("d-none");
    }
  }
};

const prepareGame = () => {
  levelProcess.showSelectLevel();
  const buttons = levelProcess.getLevelButtons();
  addBtnsEvetns(buttons);
};

const initGame = (charactersArr = []) => {
  const headerGame = getById("headerGame");

  if (isNil(charactersArr) === false && isNil(headerGame) === false) {
    // se muestra el header e inicia el juego...
    headerGame.classList.remove("d-none");

    try {
      let cardsArr = cardsClass.makeCard(charactersArr, {levelSelected, cardsQty});


      const cardsContainer = getById("cardsContainer");

      if (isNil(cardsContainer) === false) {
        // cardsArr = cardsArr.sort(() =>  Math.random() - 0.5 );
        cardsContainer.append(...cardsArr);
      }
    } catch (error) {
      console.log(error);
    } finally {
      showHideLoaderCharacters(false);
    }
  } // AGREGAR MSJ SI FALLA ALGO...
};

const getApiData = async () => {
  // cerrar la alerta que pregunta el nivel...
  Swal.close();

  showHideLoaderCharacters(true); // se pasa a false en la función de initGame

  // generar ids random...
  const charatersQty = generateRandomIds(cardsQty[levelSelected]);

  try {
    // traemos a los personajes...
    const charactersArr = await getApiClass.getCharacters(charatersQty);

    initGame([...charactersArr, ...charactersArr]);
  } catch (error) {
    console.log(error);
    showHideLoaderCharacters(false);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const spinLoading = getById("spinLoaderContainer");
    //se ejecuta para que se cree el div con el canvas al final del html y poder aplicarle un z-index
    confetti({
      particleCount: 0,
      spread: 0,
      origin: { y: 0 },
      startVelocity: 0,
    });

    btnStartGame = getById("startGame");
    if (isNil(btnStartGame) === false) {
      btnStartGame.addEventListener("click", () => {
        getApiData();
      });
    }

    if (isNil(spinLoading) === false) {
      spinLoading.classList.add("d-none");

      const mainContent = getById("mainContainer");
      if (isNil(mainContent) === false) {
        mainContent.classList.remove("d-none");

        prepareGame();
      }
    }
  }, 1000);
});
