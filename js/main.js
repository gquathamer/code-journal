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

/*
<li class="row bottom-margin">
  <div class="column-half padding-left-0">
    <img id="dummy-entry-1" class="full-width" src="./images/placeholder-image-square.jpg" alt="placeholder-image-square">
  </div>
  <div class="column-half">
    <h2>Journal Entry Title</h2>
    <p>Journal Entry text to be displayed here</p>
  </div>
</li>
*/

function renderEntry(entry) {
  var outerListItem = document.createElement('li');
  outerListItem.setAttribute('class', 'row bottom-margin');
  var imageDiv = document.createElement('div');
  imageDiv.setAttribute('class', 'column-half padding-left-0');
  outerListItem.appendChild(imageDiv);
  var imageElement = document.createElement('img');
  imageElement.setAttribute('class', 'full-width');
  imageElement.setAttribute('src', entry['photo-url']);
  imageDiv.appendChild(imageElement);
  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-half');
  outerListItem.appendChild(textDiv);
  var entryTitle = document.createElement('h2');
  entryTitle.setAttribute('class', 'top-margin-0');
  entryTitle.textContent = entry.title;
  textDiv.appendChild(entryTitle);
  var entryNotes = document.createElement('p');
  entryNotes.setAttribute('class', 'top-margin-0');
  entryNotes.textContent = entry.notes;
  textDiv.appendChild(entryNotes);
  return outerListItem;
}

var viewEntries = document.querySelector('.view-entries');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    viewEntries.appendChild(renderEntry(data.entries[i]));
  }
});
