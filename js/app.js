'use strict';

Horn.prototype.toHtml = function () {
  let source   = $('#horn-template').html();
  let template = Handlebars.compile(source);
  return template(this);
}

let allHorn = [] ;
let allKeywords = [];
let newKeywords = [];

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
    allHorn = [] ;
    allKeywords = [];
    newKeywords = [];
    data.forEach(horn => {
      let insturement = new Horn(horn);
      insturement.renderKeywords();
    });
    console.log(allHorn);
    allHorn.forEach(data => {
      $('#horn-temp').append(data.toHtml());
    });
  });
}

function page2 () {
  allHorn = [] ;
  // allKeywords = [];
  // newKeywords = [];
  $.get('../page-2.json', data => {
    allKeywords = [];
    newKeywords = [];
    console.log("unique", newKeywords)
    console.log("all of them", allKeywords)
    data.forEach(horn => {
      let insturement = new Horn(horn);
      insturement.renderKeywords();
    });
    console.log(allHorn);
    allHorn.forEach(data => {
      $('#horn-temp').append(data.toHtml());
    });
  });
}

Horn.prototype.render = function () {
  allHorn.forEach(data => {
    $('#horn-temp').append(data.toHtml());
  });
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


$('select').change(function () {
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

$('button').on('click', function(){
  let clicked = $(this).attr('id');
  console.log(clicked);
  if ( clicked === 'one') {
    $('#horn-temp').empty();
    $('select').empty();
    page1();
  } else if (clicked === 'two') {
    $('#horn-temp').empty();
    $('select').empty();
    page2();
  }
})
