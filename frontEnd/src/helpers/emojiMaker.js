import $ from "jquery"
import okay from '../svg/okay.svg';
import thumbsUp from "../svg/thumbsUp.svg"
import champagne from "../svg/champagne.svg"
import rose  from "../svg/rose.svg"
import laughing from "../svg/laughing.svg"
import poop from "../svg/poop.svg"
import megaphone from  "../svg/megaphone.svg"

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const emojis = [
  {src: okay, alt: "okays"},
  {src: thumbsUp, alt: "thumbsUp"},
  {src: laughing, alt: "laughing"},
  {src: champagne, alt: "champagne"},
  {src: rose, alt: "roses"},
  {src: poop, alt: "poop"},
  {src: megaphone, alt: "megaphone"}
]

const remove = (svg, i) => {
  $('.emoji-' + svg.alt + "-" + i).remove()
}

const drop = (svg, i) => {
  $('.emoji-' + svg.alt + "-" +i).animate({
    top: "100%",
    left: +Math.random()*90+"%"
  }, Math.random()*3000 + 3000, function() {
    remove(svg,i);
  });
}

const create = (svg) => {

  const width = 180;
  const i = Math.random().toString(36).substring(7)

  $("<div class=emoji-" + svg.alt + "-" + i +"><img src='" + svg.src + "' alt=" + svg.alt + "/></div>").css({
    "width" : width+"px",
    "top" : -Math.random()*20-20+"%",
    "left" : Math.random()*90+"%",
    "opacity" : Math.random()+0.5,
    "transform" : Math.random() > .5 ? "rotate("+Math.random()*90+"deg)" : "rotate(-"+Math.random()*90+"deg)"
  }).appendTo('.clear-container');

  drop(svg, i);
}

const makeConfetti = (rand, quantity, svg) => {
  for (let i = 0; i < quantity; i++) {
    svg = rand ? emojis[getRandomInt(emojis.length)] : svg
    create(svg);
  }
}

export default makeConfetti