angular.module('app', [
                        'ngTouch', 
                        'ui.grid', 
                        'ui.grid.pagination',
                        'ui.grid.exporter',  
                        'ui.grid.resizeColumns', 
                        'ui.grid.moveColumns',
                        'ui.grid.pinning',
                        //'ui.grid.saveState',
                        'ui.grid.grouping',
                        'ui.grid.selection'
                      ]
  ).controller('MainCtrl', MainCtrl);

function MainCtrl($interval, $q, $http) {
  function fakeI18n(title){
    return $q(function(resolve) {
      $interval(function() {
        resolve( 'col: ' + title );
      }, 1000, 1);
  });
}

  this.appData = '';

  this.gridOptions = {
    paginationPageSizes: [5, 10, 15],
    paginationPageSize: 5,
    data: this.appData,
    exporterMenuCsv: false,
    enableGridMenu: true,
    gridMenuTitleFilter: fakeI18n,
    columnDefs: [
      {name:'projectId'},
      {name:'projectState'},
      {name:'submitter'},
      {name:'request.comments'}
    ]
  }

  $http.get('map_hpe_db.projects.json')
  .then(function(response){
    console.log(response.data)
    this.appData = response.data;
  });
  console.log(this.appData)

}
