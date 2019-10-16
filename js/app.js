'use strict';

const allHorn = [] ;

function Horn(horn) {
  this.title = horn.title
  this.description = horn.description
  this.keyword = horn.keyword
  this.horns = horn.horns
  this.image_url = horn.image_url

  allHorn.push(this);
}

$.get('../page-1.json'), data => {
  data.forEach(horn => {
    let insturement = new Horn(horn)
    insturement.render(); 
  });
  console.log(allHorn);
}

Horn.prototype.render = function() {
  const myHornTemp = $('#horn-temp').html();
  const $newSection = $('<section></section>');
  $newSection.html(myHornTemp)

  $newSection.find('h2').text(this.title)
  $newSection.find('img').attr('src', this.image_url)
  $newSection.find('p').text(this.description)

  $('main').append($newSection);
}

