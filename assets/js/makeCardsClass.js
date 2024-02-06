import { Funcs } from "./funcsClass.js";

const funcs = new Funcs();
const {getById, isNil, isEmptyArr, isEmptyObj, makeConfetti, isMovilDevice, createElementHtml, addCardSelected} = funcs;


class MakeCardsClass {
    counterCards = 0;
    constructor(){}

    makeCard(characters = []) {
        console.log('MAKING CARDS ==>', characters);
        let cardsArr = [];

        if ( isNil(characters) === false ){

            characters.map(c => {

                const div1 = createElementHtml({
                    element: 'div',
                    att:[ 
                        {
                            att: 'class',
                            info: `card-mem-c`
                        },
                        // {
                        //     att: 'id',
                        //     info: c.id
                        // },

                ]
                });
                
                const div2 = createElementHtml({
                    element: 'div',
                    att:[ {
                        att: 'class',
                        info: 'card-mem card-mem--front'
                    }]
             });
            
            const imgFront = createElementHtml({
                element: 'img',
                att: [{
                    att: 'src',
                    info: c.image
                }]
            });

            const div3 = createElementHtml({
                element: 'div',
                att: [{
                    att: 'class',
                    info: 'card-mem card-mem--front'
                },
                {
                    att: 'id',
                    info: 'backImg'
                }]
            
         });
        
            const imgBack = createElementHtml({
                element: 'img',
                att:[ {
                    att: 'src',
                    info: '/assets/img/back-card.png'
                },
                {
                    att: 'class',
                    info: `${c.id}`
                }]
            });


            imgBack.onclick = (e) => {
                this.counterCards ++;
                let cards = localStorage.getItem('cards');

                if (isNil(cards) === false) {
                    cards = JSON.parse(cards);

                    if (this.counterCards < 2) {
                        cards = [...cards, c.id];
                        localStorage.setItem('cards', JSON.stringify(cards) );
                        e.target.classList.toggle('hide-back-card');
                    } 
                    else if (this.counterCards === 2){
                        e.target.classList.toggle('hide-back-card');
                        const equals = addCardSelected(cards);
    
                        if (equals === true) {
                            // son iguales...
                            // const cardsE = document.querySelectorAll(`.${card}`);
                            // if (fc.isNil(cardsE) === false) {
                            //     cardsE.map(c => c.target.classList.add('d-none'));
                            // }
                        }  else{
                            
                            cards.map(c => {
                                const cardE = document.getElementsByClassName(`${c}`);
                                if (isNil(cardE) === false){
                                    cardE[0].classList.remove('hide-back-card');
                                }
                            });
                            localStorage.removeItem('cards');
                            this.counterCards = 0;
                        }
    
    
                    }

                } else{
                    e.target.classList.toggle('hide-back-card');
                    cards = JSON.stringify([c.id]);
                    localStorage.setItem('cards', cards);
                }


               
            }

            div2.appendChild(imgFront);
            div3.appendChild(imgBack);
            div1.appendChild(div2);
            div1.appendChild(div3);



            cardsArr = [...cardsArr, div1];
            
            });// fin map
        } // fin if

        const cardsContainer = getById('cardsContainer');

        if ( isNil(cardsContainer) === false ){
            cardsContainer.append(...cardsArr);
        }
            
    }

}

export {
    MakeCardsClass
}