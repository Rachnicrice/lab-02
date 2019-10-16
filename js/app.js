'use strict';

const allHorn = [] ;

function Horn(horn) {
  this.title = horn.title
  this.description = horn.description
  this.keyword = horn.keyword
  this.horns = horn.horns
}

$.get('../page-1.json'), data => {
  data.forEach(horn => {
    new Horn (horn).render(); 
  })
}

Horn.prototype.render = function() {
  const myHornTemp = $('#horn-temp').html();
  const $newSection = $('<section></section>');
  $newSection.html(myHornTemp)
}

