angular.module('app', [
                        'ngTouch', 
                        'ui.grid', 
                        'ui.grid.pagination',
                        'ui.grid.exporter',  
                        'ui.grid.resizeColumns', 
                        'ui.grid.moveColumns',
                        'ui.grid.pinning',
                        'ui.grid.grouping',
                        'ui.grid.selection'
                      ]
  ).controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $interval, $q, $http, appData) {
  var vm = this;
  vm.appData = appData;
  vm.gridOptions = {
    paginationPageSizes: [5, 10, 15],
    paginationPageSize: 5,
    data: vm.appData,
    exporterMenuCsv: false,
    enableGridMenu: true,
    gridMenuTitleFilter: fakeI18n,
    columnDefs: [
      {name:'Actions'},
      {name:'projectId'},
      {name:'projectState'},
      {name:'submitter'},
      {name:'request.comments'}
    ]
  }

  function fakeI18n(title){
    return $q(function(resolve) {
      $interval(function() {
        resolve( 'col: ' + title );
      }, 1000, 1);
    });
  }

  /*($http.get('map_hpe_db.projects.json')
  .then(function(response){
    console.log(response.data)
    $scope.appData = angular.copy(response.data);
    console.log($scope.appData)
  });*/
  

}
