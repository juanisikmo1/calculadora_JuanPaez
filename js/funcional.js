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
                //console.log("numero");
                if(p.operaciones.innerHTML == "0")
                {
                    p.operaciones.innerHTML = digito;
                }else{
                    p.operaciones.innerHTML += digito;
                }
            break;

            case "simbolo":
                //console.log("simbolo");
                p.operaciones.innerHTML += digito;
            break;

            case "decimal":
                //console.log("decimal");
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

            // validar división por cero
            if (p.operaciones.innerHTML.includes("/0")) {
                p.operaciones.innerHTML = "Error";
            } else {
                try {
                    p.operaciones.innerHTML =
                    eval(p.operaciones.innerHTML);
                } catch {
                    p.operaciones.innerHTML = "Error";
                }
            }
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

    }
}
m.inicio();