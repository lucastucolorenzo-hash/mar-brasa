import camarao from "@/assets/camarao-abacaxi.jpg";
import bobo from "@/assets/bobo-camarao.jpg";
import feijoada from "@/assets/feijoada.jpg";
import temaki from "@/assets/temaki-hot.jpg";
import calabresa from "@/assets/calabresa.jpg";
import churrasquinho from "@/assets/churrasquinho.jpg";
import escondidinho from "@/assets/escondidinho.jpg";
import parmegiana from "@/assets/parmegiana.jpg";
import fullMenu from "./full-menu.json";

export const dishes = [
  { name: "Camarão no Abacaxi - 02 Pessoas", price: "R$ 199,90", category: "Frutos do Mar", image: camarao },
  { name: "Bobó de Camarão", price: "R$ 99,90", category: "Frutos do Mar", image: bobo },
  { name: "Feijoada Individual", price: "R$ 59,90", category: "Feijoada", image: feijoada },
  { name: "Combo Temaki + Hot", price: "R$ 54,00", category: "Combos", image: temaki },
  { name: "Calabresa Acebolada", price: "R$ 41,90", category: "Entradas", image: calabresa },
  { name: "Churrasquinho de Carne", price: "R$ 39,90", category: "Carnes", image: churrasquinho },
  { name: "Escondidinho de Carne Seca", price: "R$ 39,90", category: "Carnes", image: escondidinho },
  { name: "Parmegiana de Filé Mignon", price: "R$ 39,90", category: "Carnes", image: parmegiana },
];

export const menuItems = fullMenu;
export const categories = ["Todos", ...new Set(menuItems.map((item) => item.category))];
export const address = "Av. Dr. Arthur da Costa Filho, 937 - Centro, Caraguatatuba - SP, 11660-005";
export const directionsUrl = "https://www.google.com/maps/place/Mar+e+Brasa/@-23.6240754,-45.4105553,17z/data=!3m1!4b1!4m6!3m5!1s0x94cd63adef3b531b:0x14ea6b69e1617093!8m2!3d-23.6240754!4d-45.4105553!16s%2Fg%2F11sdstp158";
