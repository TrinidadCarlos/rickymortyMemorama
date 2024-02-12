import { Funcs } from "./funcsClass.js";
import { AlertsClass } from "./AlertsClass.js";

const funcs = new Funcs();
const aC = new AlertsClass();
const {
  getById,
  isNil,
  makeConfetti,
  isMovilDevice,
  createElementHtml,
  randomInRange
} = funcs;

const {simpleAlert, simpleAlertHTML} = aC;

const gameMsgs = {
  easy: {
    1: {
      msg: '¡Felicidades!',
      img: '1.png',
    },
    2: {
      msg: 'Al menos lo intentaste',
      img: '2-1.png',
    },
    3: {
      msg: 'Oh rayos, Eso fue pésimo',
      img: '2.png',
    }
  }, 
  medium: {
    1: {
      msg: '¡Felicidades!',
      img: '1-2.png',
    },
    2: {
      msg: 'Una vez más',
      img: '3-1.png',
    },
    3: {
      msg: 'Oh, vamos... Mejor llamo a summer',
      img: '3-2.png',
    }
  },
  difficult: {
    1: {
      msg: '¡Oh, excelente! mira eso morty',
      img: '1-3',
    },
    2: {
      msg: '¿¡Podrás una vez más!?',
      img: '3-1',
    },
    3: {
      msg: 'Hay un botón de "Fácil" también',
      img: 'easy-level.jpg',
    }
  },
}



class CardsClass {
  counterAttempts = 0;
  counterCards = 0;
  cards = [];
  levelSelected = '';
  totalCards = 0;
  constructor() {}

  makeCard(characters = [], dataExtra = {}) {
    this.levelSelected = dataExtra.levelSelected;
    let cardsArr = [];


    this.totalCards = dataExtra.cardsQty[dataExtra.levelSelected];  


    if (isNil(characters) === false) {
      characters.map((c, idx) => {
            const randomId = Math.random() * 12;
        const div1 = createElementHtml({
          element: "div",
          att: [
            {
              att: "class",
              info: `card-mem-c`,
            },
            {
              att: 'id',
              info: `parentCard${idx}`
            }
          
          ],
        });

        const div2 = createElementHtml({
          element: "div",
          att: [
            {
              att: "class",
              info: "card-mem card-mem--front",
            },
          ],
        });

        const imgFront = createElementHtml({
          element: "img",
          att: [
            {
              att: "src",
              info: c.image,
            },
          ],
        });

        const div3 = createElementHtml({
          element: "div",
          att: [
            {
              att: "class",
              info: "card-mem card-mem--front",
            },
            {
              att: "id",
              info: "backImg" + idx,
            },
          ],
        });

        const imgBack = createElementHtml({
          element: "img",
          att: [
            {
              att: "src",
              info: "/assets/img/back-card.png",
            },
            {
              att: "class",
              info: `${c.id}`,
            },
            {
                att: 'id', // se usará de id para saber si se le da doble click a la misma imagen...
                info: idx
            }
            
          ],
        });

        imgBack.onclick = (e) => {
          // revisar que no sea el mismo...
          const cardsClicked = {
            idImg: c.id,
            element: e.target,
            parent: getById(`parentCard${idx}`)
          };
          
          if ( this.cards.length > 0 ) {
            const alreadyExists = this.checkDoubleClick(cardsClicked);
            if (alreadyExists === true) {
              return; // doble click a la misma imagen... no se agrega
            }
          }


          // agregar 
        this.counterCards++;

          if (this.counterCards < 2) {
            e.target.classList.add("hide-back-card");
            this.addCard(cardsClicked);

          }
          else if (this.counterCards === 2) {
            e.target.classList.add("hide-back-card");
            this.addCard(cardsClicked);

            // revisar si son iguales...
            let areEquales = false;
            setTimeout(() => {
              areEquales = this.checkCards();
              
              this.setAttempts();
              if (areEquales === true) {
                makeConfetti({
                  particleCount: 50,
                  spread: 360,
                  originY: 0.5,
                  startVelocity: 50
                })
                this.hideEqualsCards();
                
                this.updateTotalCards();
              } else {
                this.resetCards();
              }
              
            }, 500);

          }

        }

        div2.appendChild(imgFront);
        div3.appendChild(imgBack);
        div1.appendChild(div2);
        div1.appendChild(div3);
        
        cardsArr = [...cardsArr, div1];
      }); // fin map
    } // fin if


    return cardsArr;
  }

  resetCards () {
    this.cards.map(c => {
      c.element.classList.add('show-back-card');
      c.element.classList.remove('hide-back-card');
    });
    this.cards = [];
    this.counterCards = 0;
  }

  hideEqualsCards () {
    this.cards.map(c => {
      c.parent.classList.add('d-none');
    });
    this.cards = [];
    this.counterCards = 0;
  }

  addCard (card = {}) {
    this.cards = [
      ...this.cards,
      card
    ];
  }

  checkDoubleClick (newCard = {}) {
   return this.cards[0].element.id == newCard.element.id; 
  }

  checkCards () {
    return this.cards[0].idImg === this.cards[1].idImg;
  }

  setAttempts () {
    this.counterAttempts++;

    const attemptsHtml = getById('attemptsId');
    if (isNil(attemptsHtml) === false) {
      attemptsHtml.textContent = this.counterAttempts;
    }
  }

  updateTotalCards () {
    this.totalCards--; // se resta un (un par) para tener el contador

    if (this.totalCards == 0) {
      const attemps = this.counterAttempts;

      // se crea el objeto de confeti
      let timesRepeatConffeti = 1;
      
      //revisamos la los intentos...
      const allDataEndLevel = gameMsgs[this.levelSelected];
      let dataLevel = null;
      

      if (this.levelSelected === 'easy') {
        if (attemps <= 7 ) {
          dataLevel = allDataEndLevel[1];
          timesRepeatConffeti = 3;
        }
        else if (attemps > 7 && attemps <= 9 ) {
          dataLevel = allDataEndLevel[2];
          timesRepeatConffeti = 2;
        }
        else if (attemps > 9 ) {
          dataLevel = allDataEndLevel[3];
        }
      }

      else if (this.levelSelected === 'medium') {
        if (attemps <= 12 ) {
          dataLevel = allDataEndLevel[1];
          timesRepeatConffeti = 4
        }
        else if (attemps > 12 && attemps <= 14 ) {
          dataLevel = allDataEndLevel[2];
          timesRepeatConffeti = 3;
        }
        else if (attemps > 14 ) {
          dataLevel = allDataEndLevel[3];
        }
      }

      
      else if (this.levelSelected === 'difficult') {
        if (attemps <= 24 ) {
          dataLevel = allDataEndLevel[1];
          timesRepeatConffeti = 6
        }
        else if (attemps > 24 && attemps <= 27 ) {
          dataLevel = allDataEndLevel[2];
          timesRepeatConffeti = 3
        }
        else if (attemps > 27 ) {
          dataLevel = allDataEndLevel[3];
        }
      }
      
      simpleAlertHTML({
        title: this.counterAttempts + ' Intentos, ' + dataLevel.msg,
        imgName: dataLevel.img
      });

      const repeatGame = getById('repeatGame');

      if(isNil(repeatGame) === false) {
        repeatGame.addEventListener ('click', e => {
          location.reload();
        });
      }

      for(let i = 0 ; i < timesRepeatConffeti ; i++){

        makeConfetti({
          particleCount: randomInRange(100,200),
          spread: randomInRange(50, 80),
          origin: { y: randomInRange(0, 1), x: randomInRange(0, 1) },
          startVelocity: randomInRange(30, 40),
          angle: randomInRange( 55, 125)
      });
      }


      // reset a los states...
      this.counterAttempts = 0;
      this.counterCards = 0;
      this.cards = [];
      this.levelSelected = '';
      this.totalCards = 0;

      return;
    }

  }


} // FIN CLASE

export { CardsClass };
