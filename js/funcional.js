// crear las propiedades del objeto

let p = {
    teclas:document.querySelectorAll("#calculadora ul li"),
    borrar: document.querySelector("#borrar"),
    accion:null,
    digito:null,
    operaciones:document.querySelector("#operaciones"),
    cantisignos:0,
    cantidecimal:false,
    resultado:false
}

// crear los metodos

let m = {
    inicio:function()
    {
        for (let i = 0; i < p.teclas.length; i++)
        {
            p.teclas[i].addEventListener("click", m.oprimirtecla)
        }
        //borrar
        p.borrar.addEventListener("click", m.limpiar);
        //teclado
        document.addEventListener("keydown", m.teclado);
    },
    oprimirtecla: function(tecla)
    {
        p.accion= tecla.target.getAttribute("class");
        p.digito= tecla.target.innerHTML;
        console.log(p.digito);
        m.calculadora(p.accion,p.digito);

    },
    calculadora: function(accion,digito)
    {
        switch(accion)
        {
            case "numero":
                if(
                    p.operaciones.innerHTML == "0" ||
                    p.operaciones.innerHTML == "Error"
                )
                {
                    p.operaciones.innerHTML = digito;
                }else{
                    p.operaciones.innerHTML += digito;
                }
            break;

            case "simbolo":

            let ultimo =
            p.operaciones.innerHTML.slice(-1);

            // evitar operadores repetidos
            if(["+","-","*","/"].includes(ultimo))
            {
                return;
            }

            p.operaciones.innerHTML += digito;
            break;

            case "decimal":
                //console.log("decimal");
                let partes =
            p.operaciones.innerHTML.split(/[\+\-\*\/]/);

            let actual =
            partes[partes.length - 1];

            // evitar doble decimal
            if(actual.includes("."))
            {
                return;
            }

            p.operaciones.innerHTML += digito;
            break;

            case "raiz":
            try {
                let valor =
                parseFloat(p.operaciones.innerHTML);
                if(valor < 0){
                    p.operaciones.innerHTML = "Error";
                }else{
                    p.operaciones.innerHTML =
                    Math.sqrt(valor);
                }
            } catch {
                p.operaciones.innerHTML = "Error";
            }
            break;

            case "igual":
                try {
                    let resultado =
                    eval(p.operaciones.innerHTML);
                    if(!isFinite(resultado)){
                        p.operaciones.innerHTML = "Error";
                    }else{
                        p.operaciones.innerHTML = resultado;
                    }
                } catch {
                    p.operaciones.innerHTML = "Error";
                }
            break;

            case "seno":

                try {

                    let valor =
                    eval(p.operaciones.innerHTML);

                    let radianes =
                    valor * (Math.PI / 180);

                    p.operaciones.innerHTML =
                    Math.sin(radianes);

                } catch {

                    p.operaciones.innerHTML = "Error";
                }

            break;

            case "coseno":

                try {

                    let valor =
                    eval(p.operaciones.innerHTML);

                    let radianes =
                    valor * (Math.PI / 180);

                    p.operaciones.innerHTML =
                    Math.cos(radianes);

                } catch {

                    p.operaciones.innerHTML = "Error";
                }

            break;
            case "potencia":

                let ultimoPotencia =
                p.operaciones.innerHTML.slice(-1);

                // evitar operadores repetidos
                if(["+","-","*","/","**"].includes(ultimoPotencia))
                {
                    return;
                }

                p.operaciones.innerHTML += "**";

            break;
        }
    },
    limpiar:function()
    {
        p.operaciones.innerHTML = "0";
    },
    teclado: function (evento)
    {

        let tecla = evento.key;

        // números
        if (!isNaN(tecla)) {

            m.calculadora("numero", tecla);
        }

        // operadores
        else if (["+", "-", "*", "/"].includes(tecla)) {

            m.calculadora("simbolo", tecla);
        }

        // decimal
        else if (tecla == ".") {

            m.calculadora("decimal", tecla);
        }

        // enter
        else if (tecla == "Enter") {

            m.calculadora("igual", "=");
        }

        // borrar último carácter
        else if (tecla == "Backspace") {

            let texto = p.operaciones.innerHTML;
            
            if (texto.length > 1) {
                p.operaciones.innerHTML =
                texto.slice(0, -1);
            } else {
                p.operaciones.innerHTML = "0";
            }
        }

        // raíz cuadrada
        else if (tecla == "r") {
        m.calculadora("raiz", "√");
        }
        // seno
        else if (tecla == "s") {

            m.calculadora("seno", "sin");
        }

        // coseno
        else if (tecla == "c") {

            m.calculadora("coseno", "cos");
        }
        // potencia
        else if (tecla == "^") {

            m.calculadora("potencia", "^");
        }

    }
}
m.inicio();