/* global data */
/* exported data */
var photoUrl = document.querySelector('#entry-photo');
var photoWindow = document.querySelector('#photo-window');

photoUrl.addEventListener('blur', function (event) {
  photoWindow.src = photoUrl.value;
});

var entryForm = document.forms[0];

entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formControl = {};
  for (var i = 0; i < entryForm.elements.length - 1; i++) {
    formControl[entryForm.elements[i].name] = entryForm.elements[i].value;
  }
  formControl.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(formControl);
  photoWindow.src = './images/placeholder-image-square.jpg';
  entryForm.reset();
  var dataModelString = JSON.stringify(data);
  localStorage.setItem('data-model', dataModelString);
});
