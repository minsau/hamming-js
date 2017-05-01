'use strict'

// Bits para realizar las comparaciones en las posiciones 3, 5, 6 y 7
let datosAComparar = ['011','101','110','111'];


function dividirPalabras(){
  /*
  * p1 contiene la palabra sin el error
  * p2 contiene la palabra con error
  * para calcular cada tabla dividimos cada palabra en neebles de 4bits y se los enviamos a la función
  * calcularTabla()
  */
  $("#resultados").html("");
  $("#errores").html("");
  let pAcumuladaPrimer, pAcumuladaSegundo, r, calculoP;
  let p1 = $("#palabraSError").val(); //primer palabra
  let p2 = $("#palabraCError").val(); //segunda palabra
  
  let p1n1 = p1.substring(0,4); //primer neeble de la primera palabra
  let p2n1 = p2.substring(0,4); //primer neeble de la segunda palabra
  let p1n2 = p1.substring(4); //segundo neeble de la primera palabra
  let p2n2 = p2.substring(4); //segundo neeble de la segunda palabra

  console.log(p1n2);
  /* 
  * Cada uno de los pasos se repite con cada neeble para obtener su tabla
  * 
  */
  let matriz = calcularTabla(p1n1);
  r = calcularResultado(matriz, p1n1);
  pAcumuladaPrimer = paridadAcumulada(r);
  dibujarTabla(matriz,pAcumuladaPrimer, pAcumuladaPrimer, p1n1, "Primer neeble de la primer palabra");

  matriz = calcularTabla(p1n2);
  r = calcularResultado(matriz, p1n2);
  pAcumuladaSegundo = paridadAcumulada(r);
  dibujarTabla(matriz,pAcumuladaSegundo, pAcumuladaSegundo, p1n2, "Segundo neeble de la primer palabra");


  matriz = calcularTabla(p2n1);
  r = calcularResultado(matriz, p2n1);
  let CalP1 = paridadAcumulada(r);
  dibujarTabla(matriz,CalP1, pAcumuladaPrimer, p2n1, "Primer neeble de la segunda palabra");

  matriz = calcularTabla(p2n2);
  r = calcularResultado(matriz, p2n2);
  let CalP2 = paridadAcumulada(r);
  dibujarTabla(matriz,CalP2, pAcumuladaSegundo, p2n2, "Segundo neeble de la segunda palabra");

  let p;
  let e1 = comprobarError(CalP1, pAcumuladaPrimer);
  let err1 = revisarError(e1);

  if(err1){
    p = buscarError(e1);
    let alert1 = `
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" id='alert1'>
        <div class="alert alert-danger" role="alert">
          <strong>Hay un error en el primer neeble!</strong> En la posición: ${p}<br>
          <button class="btn btn-danger" onclick="corregirError(1)">Corregir</button>
        </div>
      </div>
    `;
    $("#errores").append(alert1);
  }

  let e2 = comprobarError(CalP2, pAcumuladaSegundo);
  let err2 = revisarError(e2);

  if(err2){
    p = buscarError(e2);
    let alert2 = `
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12" id='alert2'>
        <div class="alert alert-danger" role="alert">
          <strong>Hay un error en el segundo neeble!</strong> En la posición: ${p}<br>
          <button class="btn btn-danger" onclick="corregirError(2)">Corregir</button>
        </div>
      </div>
    `;
    $("#errores").append(alert2);
  }
  

}

function corregirError(p){
  let temp = "";
  let p1 = $("#palabraSError").val(); //primer palabra
  let p2 = $("#palabraCError").val(); //segunda palabra

  if(p === 1){
    temp = p1.substring(0,4) + p2.substring(4);
    $("#palabraCError").val(temp);
  }

  if(p === 2){
    temp = p2.substring(0,4) + p1.substring(4);
    $("#palabraCError").val(temp);
  }

  dividirPalabras();
}

function buscarError(cadena){
  let suma = 0;
  suma += parseInt(cadena[2] * 4);
  suma += parseInt(cadena[1] * 2);
  suma += parseInt(cadena[0] * 1);
  return suma;
}

function dibujarTabla(r, cp, pa, or, texto){
  let o = `
    <tr>
      <td> Original </td>
      <td> </td>
      <td> </td>
      <td>${or[0]}</td>
      <td> </td>
      <td>${or[1]}</td>
      <td>${or[2]}</td>
      <td>${or[3]}</td>
      <td> </td>
      <td> </td>
    </tr>
  `;
  let f1 = `
    <tr>
      <td> Pari 1 </td>
      <td class = 'bg-danger'>${r[0][4]}</td>
      <td> </td>
      <td>${or[0]}</td>
      <td> </td>
      <td>${r[0][2]}</td>
      <td></td>
      <td>${r[0][0]}</td>
      <td>${cp[0]}</td>
      <td>${pa[0]}</td>
    </tr>
  `;

  let f2 = `
    <tr>
      <td> Pari 2 </td>
      <td> </td>
      <td class = 'bg-danger'>${r[1][4]}</td>
      <td>${or[0]}</td>
      <td> </td>
      <td></td>
      <td>${r[1][1]}</td>
      <td>${r[1][0]}</td>
      <td>${cp[1]}</td>
      <td>${pa[1]}</td>
    </tr>
  `;

  let f3 = `
    <tr>
      <td> Pari 3 </td>
      <td></td>
      <td></td>
      <td></td>
      <td class = 'bg-danger'>${r[2][4]}</td>
      <td>${r[2][2]}</td>
      <td>${r[2][1]}</td>
      <td>${r[2][0]}</td>
      <td>${cp[2]}</td>
      <td>${pa[2]}</td>
    </tr>
  `;

  //matriz[0][4] + "" + matriz[1][4] + neeble[0] + matriz[2][4] + neeble.substring(1);
  let res = `
    <tr class='table-success'>
      <td> R </td>
      <td>${r[0][4]}</td>
      <td>${r[1][4]}</td>
      <td>${or[0]}</td>
      <td>${r[2][4]}</td>
      <td>${or[1]}</td>
      <td>${or[2]}</td>
      <td>${or[3]}</td>
      <td></td>
      <td></td>
    </tr>
  `;

  let thead = `
    <div class = 'col-sm-6 col-xs-6 col-md-6 col-lg-6' style='margin-top: 5px;'>
      <div class='card'>
        <div class='card-header'>
          ${texto}
        </div>
        <div class='card-block'>   
          <table class='table text-center table-sm'>
            <thead class = 'thead-inverse'>
              <th> - </th>
              <th> P1 </th>
              <th> P2 </th>
              <th> D3 </th>
              <th> P4 </th>
              <th> D5 </th>
              <th> D6 </th>
              <th> D7 </th>
              <th> CP </th>
              <th> PA </th>
            </thead>
            <tbody>
  `;

  let tfooter = `
            </tbody>    
          </table>
        </div> 
      </div>
    </div> 
  `;

  $("#resultados").append(thead + o + f1 + f2 + f3 + res + tfooter);
}

function calcularTabla(neeble){
  let matriz = [];
  let fila = [];
  let temp = "";
  for(let c = 2; c >= 0; c--){
    fila = [];
    temp = "";
    for(let i = neeble.length - 1; i >= 0; i--){
      temp = compararBits(datosAComparar[i][c], neeble[i]);
      fila.push(temp);
      
    }
    fila.push(bitParidad(fila));
    matriz.push(fila);
  }
  
  return matriz;
}

function calcularResultado(matriz, neeble){
  let r = matriz[0][4] + "" + matriz[1][4] + neeble[0] + matriz[2][4] + neeble.substring(1);
  return r;
}

function compararBits(bit1, bit2){
  if(bit1 == 0){
    return -1;
  } else {
    if(bit2 == 1){
      return 1;
    } else {
      return 0;
    }
  }
}

function bitParidad(fila){
  let suma = 0;
  for(let i = 0; i < fila.length; i++){
    if(fila[i] != -1){
      suma += fila[i];
    }
  }

  return suma % 2;
}

function paridadAcumulada(r){
  return r[0] + "" + r[1] + r[3];
}

function comprobarError(cp, pa){
  let temp = "";
  for(let i = 0; i < cp.length; i++){
    if(cp[i] === pa[i]){
      temp = temp + "0";
    }else{
      temp = temp + "1";
    }
  }

  return temp;
}

function revisarError(c){
  for(let i = 0; i < c.length; i++){
    if(c[i] != 0){
      return true;
    }
  }

  return false;
}
