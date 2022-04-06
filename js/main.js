/* global data */
/* exported data */
var photoUrl = document.querySelector('#entry-photo');
var photoWindow = document.querySelector('#photo-window');

photoUrl.addEventListener('blur', function (event) {
  photoWindow.src = photoUrl.value;
});

var entryForm = document.forms[0];

var noEntries = document.querySelector('.no-entries');

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
  viewEntries.prepend(renderEntry(formControl));
  for (var j = 0; j < entryViewElements.length; j++) {
    if (entryViewElements[j].getAttribute('data-view') === 'entries') {
      entryViewElements[j].classList.remove('hidden');
    } else {
      entryViewElements[j].classList.add('hidden');
    }
  }
  if (data.entries.length > 0) {
    noEntries.setAttribute('class', 'row justify-content no-entries hidden');
  }

});

function renderEntry(entry, id) {
  var outerListItem = document.createElement('li');
  outerListItem.setAttribute('class', 'row bottom-margin');
  outerListItem.setAttribute('data-entry-id', id);
  var imageDiv = document.createElement('div');
  imageDiv.setAttribute('class', 'column-half padding-left-0 top-margin');
  outerListItem.appendChild(imageDiv);
  var imageElement = document.createElement('img');
  imageElement.setAttribute('class', 'full-width');
  imageElement.setAttribute('src', entry['photo-url']);
  imageDiv.appendChild(imageElement);
  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-half top-margin');
  outerListItem.appendChild(textDiv);
  var titleEditRow = document.createElement('div');
  titleEditRow.setAttribute('class', 'row justify-between');
  textDiv.appendChild(titleEditRow);
  var entryTitle = document.createElement('h2');
  entryTitle.setAttribute('class', 'top-margin-0');
  entryTitle.textContent = entry.title;
  titleEditRow.appendChild(entryTitle);
  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-edit');
  titleEditRow.appendChild(editIcon);
  var entryNotes = document.createElement('p');
  entryNotes.setAttribute('class', 'top-margin-0');
  entryNotes.textContent = entry.notes;
  textDiv.appendChild(entryNotes);
  return outerListItem;
}

var viewEntries = document.querySelector('.view-entries');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    viewEntries.appendChild(renderEntry(data.entries[i], i));
  }
});

var newEntryButton = document.querySelector('#new-entry');

var entryViewElements = document.querySelectorAll('.entry-view');

newEntryButton.addEventListener('click', function (event) {
  for (var i = 0; i < entryViewElements.length; i++) {
    if (entryViewElements[i].getAttribute('data-view') === 'entries') {
      entryViewElements[i].classList.add('hidden');
    } else {
      entryViewElements[i].classList.remove('hidden');
    }
  }
});

if (data.entries.length > 0) {
  noEntries.setAttribute('class', 'row justify-content no-entries hidden');
}

var viewEntriesParentElement = document.querySelector('.view-entries');

viewEntriesParentElement.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    for (var i = 0; i < entryViewElements.length; i++) {
      if (entryViewElements[i].getAttribute('data-view') === 'entries') {
        entryViewElements[i].classList.add('hidden');
      } else {
        entryViewElements[i].classList.remove('hidden');
      }
    }
    data.editing = data.entries[event.target.closest('LI').getAttribute('data-entry-id')];
  }
});
