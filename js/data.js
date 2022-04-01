/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataModelString = localStorage.getItem('data-model');

if (previousDataModelString !== null) {
  data = JSON.parse(previousDataModelString);
}
