class Funcs {

    constructor(){}
    
    isNil = (value = null) => {
        // true => is null or undefined or empty string
        // false => has some value... any value
        if (value === null || value === 'undefined' || value === 'null' || value === undefined || value === '') {
            return true;
        } else {
            return false
        }
    }
    
    isEmptyArr = (value = []) => {
        // true => has no values or is null/undefined
        // false => has some values
    
        const isObj = value instanceof Object;
    
        if (this.isNil(value) === true) {
            return true;
        }
        else if (isObj === false) {
            return true;
        }
        else if (isObj === true && Array.isArray(value) === true && value.length > 0) {
            return false;
        }
        
    }
    
    isEmptyObj = (value = []) => {
        // true => has no values or is null/undefined
        // false => has some values
    
        const isObj = value instanceof Object;
    
        if (this.isNil(value) === true) {
            return true;
        }
        else if (isObj === false) {
            return true;
        }
        else if (isObj === true && Object.entries(value).length > 0) {
            return false;
        }
        
    }
    
    getById = (elementName = '') => {
        let element = null;
        if (this.isNil(elementName) === true  ) return element;
    
        element = document.getElementById(elementName);
        return element;
    }


    makeConfetti(props = {}){
        // esta funcón se ejecuta al iniciar la app... para poder agregar la clase z-index
        const fc = new Funcs();
        
        const assignValues = {
            particleCount: fc.isNil(props?.particleCount) === false ? props.particleCount : 100,
            spread: fc.isNil(props?.spread) === false ? props.spread : 70,
            originY: fc.isNil(props?.originY) === false ? props.originY : 0,
            startVelocity: fc.isNil(props?.startVelocity) === false ? props.startVelocity : 30,
            angle: fc.isNil(props?.angle) === false ? props.angle : 90,
        };

        const canvasConfetti = fc.getById('confetti');
        if (canvasConfetti.classList.contains('zIndex-conffeti') === false ) {
            canvasConfetti.classList.add('zIndex-conffeti'); // = "4000!important";
        }
        
            confetti({
                particleCount: assignValues.particleCount,
                spread: assignValues.spread,
                origin: { y: assignValues.originY },
                startVelocity: assignValues.startVelocity,
                angle: assignValues.angle
            });

    } 


    isMovilDevice() {
        let navegador = navigator.userAgent;
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
        } else {
            return false;
        }

    }

    generateRandomIds (idsQty = 0) {
        // There is a total of 826 characters sorted by id. rickAndMorty api
        const totalCharactersApi = 826;

        let idsArr = [];
        for (let i = 0 ; i < idsQty ; i++ ) {
            const id = Math.ceil( Math.random(1) * totalCharactersApi );
            idsArr.push(id);
        }
        return idsArr;
    }

    randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

    createElementHtml (data = {})  {
        const element = document.createElement(data.element);
        data.att.forEach(a => {
            element.setAttribute(a.att, a.info);
        });
    
        return element;
    }

}




export {Funcs}