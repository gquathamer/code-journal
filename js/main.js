/* global data */
/* exported data */
var photoUrl = document.querySelector('#entry-photo');
var photoWindow = document.querySelector('#photo-window');
var entryForm = document.forms[0];
var noEntries = document.querySelector('.no-entries');
var viewEntriesParentElement = document.querySelector('.view-entries');
var newEntryButton = document.querySelector('#new-entry');
var entryViewElements = document.querySelectorAll('.entry-view');
var viewEntries = document.querySelector('.view-entries');

photoUrl.addEventListener('blur', function (event) {
  photoWindow.src = photoUrl.value;
});

entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var formControl = {};
  for (var i = 0; i < entryForm.elements.length - 1; i++) {
    formControl[entryForm.elements[i].name] = entryForm.elements[i].value;
  }
  // formControl.entryId = data.entries.length;
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(formControl);
    photoWindow.src = './images/placeholder-image-square.jpg';
    entryForm.reset();
    viewEntries.innerHTML = '';
    for (var j = 0; j < data.entries.length; j++) {
      viewEntries.appendChild(renderEntry(data.entries[j], j));
    }
    // viewEntries.prepend(renderEntry(formControl, formControl.entryId));
  } else {
    data.entries[data.editing.entryId] = formControl;
    photoWindow.src = './images/placeholder-image-square.jpg';
    entryForm.reset();
    viewEntries.innerHTML = '';
    for (var k = 0; k < data.entries.length; k++) {
      viewEntries.appendChild(renderEntry(data.entries[k], k));
    }
    // need to grab the element that is the previous version, and use element.replaceWith() to change it to new one
    // var currentListItem = document.querySelector('[data-entry-id="' + data.editing.entryId + '"]');
    // currentListItem.replaceWith(renderEntry(formControl, formControl.entryId));
  }
  for (var l = 0; l < entryViewElements.length; l++) {
    if (entryViewElements[l].getAttribute('data-view') === 'entries') {
      entryViewElements[l].classList.remove('hidden');
    } else {
      entryViewElements[l].classList.add('hidden');
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

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    viewEntries.appendChild(renderEntry(data.entries[i], i));
  }
});

newEntryButton.addEventListener('click', function (event) {
  data.editing = null;
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

viewEntriesParentElement.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    for (var i = 0; i < entryViewElements.length; i++) {
      if (entryViewElements[i].getAttribute('data-view') === 'entries') {
        entryViewElements[i].classList.add('hidden');
      } else {
        entryViewElements[i].classList.remove('hidden');
      }
    }
    for (var k = 0; k < data.entries.length; k++) {
      if (data.entries[k].entryId === data.entries[event.target.closest('LI').getAttribute('data-entry-id')].entryId) {
        data.editing = data.entries[event.target.closest('LI').getAttribute('data-entry-id')];
        data.editing.entryId = event.target.closest('LI').getAttribute('data-entry-id');
      }
    }
    for (var j = 0; j < entryForm.elements.length - 1; j++) {
      entryForm.elements[j].value = data.editing[entryForm.elements[j].name];
    }
    photoWindow.src = data.editing['photo-url'];
  }
});
