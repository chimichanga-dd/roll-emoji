import React from "react"
import $ from "jquery"
import {Button} from "semantic-ui-react"


function create(svg, i) {
  var width = 50;

  $("<div class=emoji-" + svg.alt + "-" + i +"><img src='" + svg.src + "' alt=" + svg.alt + "/></div>").css({
    "width" : width+"px",
    "top" : -Math.random()*20+"%",
    "left" : Math.random()*90+"%",
    "opacity" : Math.random()+0.5,
    "transform" : Math.random() > .5 ? "rotate("+Math.random()*90+"deg)" : "rotate(-"+Math.random()*90+"deg)"
  }).appendTo('.main-body');

  drop(svg, i);
}

function drop(svg, x) {
  $('.emoji-' + svg.alt + "-" +x).animate({
    top: "90%",
    left: +Math.random()*90+"%"
  }, Math.random()*3000 + 3000, function() {
    remove(svg,x);
  });
}

function remove(svg, x) {
  $('.emoji-' + svg.alt + "-" + x).remove()
}

const makeConfetti = (svg) => {
  for (var i = 0; i < 50; i++) {
    create(svg,i);
  }
}

const EmojiButton = ({svg}) => {
  return (
    <Button
      className="ui secondary button"
      onClick={() => makeConfetti(svg)}>
      <img className={"button-emoji"} src={svg.src} alt={svg.alt}/>
    </Button>
  )
}

export default EmojiButton