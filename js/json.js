import {
  mostrarSumaTransaccion,
  populateSelect,
  link,
  dolarBlue,
  getData,
  postData
} from "./functions.js";
let arrayTest = [
  {
      value: "sueldo",
      text: "Sueldo"
  }, 

  {
      value: "devoluciones",
      text: "Devoluciones"
  },

  {
      value: "aguinaldo",
      text: "Aguinaldo"
  },
  
  {
      value: "bono",
      text: "Bono"
  },

  {
      value: "otro",
      text: "Otros"
  }
];
let jsonTest = JSON.stringify(arrayTest);

//getData("62c4c0c64bccf21c2ecf4b68");

const binID = postData (jsonTest,"jsonPrueba");
console.log(binID);

