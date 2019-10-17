'use strict';



Horn.prototype.toHtml = function () {
  let source   = $("horn-template").html();
  let template = Handlebars.compile(source);
  return template
}

const allHorn = [] ;
const allKeywords = [];
const newKeywords = [];

function Horn(horn) {
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  this.image_url = horn.image_url;

  allHorn.push(this);
  allKeywords.push(this.keyword);
}

function page1 () {
$.get('../page-1.json', data => {
  data.forEach(horn => {
    let insturement = new Horn(horn);
    insturement.render();
    insturement.renderKeywords();
  });
  console.log(allHorn);
});
};

function page2 () {
$.get('../page-2.json', data => {
  data.forEach(horn => {
    let insturement = new Horn(horn);
    insturement.render();
    insturement.renderKeywords();
  });
  console.log(allHorn);
});
};

Horn.prototype.render = function() {
  const myHornTemp = $('#horn-temp').html();
  const $newSection = $('<section></section>');
  $newSection.html(myHornTemp)
  $newSection.addClass(this.keyword)

  $newSection.find('h2').text(this.title)
  $newSection.find('img').attr('src', this.image_url)
  $newSection.find('p').text(this.description)

  $('main').append($newSection);
}

Horn.prototype.renderKeywords = function () {
  for (let i = 0; i < allKeywords.length; i++) {
    if (!newKeywords.includes(allKeywords[i])){
      newKeywords.push(allKeywords[i])

      const selectBox = $('#menu').html();
      const $newOption = $('<option></option>');
      $newOption.html(selectBox);

      $newOption.text(allKeywords[i])
      $newOption.attr(allKeywords[i])

      $('#menu').append($newOption)

    }
  }
}


$('select').change(function (event) {
  console.log(allHorn)
  let filter = $(this).val();
  console.log(filter)

  if (filter === 'default') {
    allHorn.forEach( function (thing) {
      $(`${thing.keyword}`).fadeIn();
    })
  } else {
    allHorn.forEach( function (obj) {
      if (filter === obj.keyword) {
        $(`.${obj.keyword}`).fadeIn()
      } else {
        $(`.${obj.keyword}`).hide()
      }
    })
  }
  
})

page1();

$('button').on('click', function(e){
  let clicked = $(this).attr('id');
  console.log(clicked);
  if ( clicked === 'one') { 
  $('#horn-temp').siblings().remove();
  location.reload();
  page1();
  } else if (clicked === 'two') {
  $('#horn-temp').siblings().remove();
  page2();
  }
})