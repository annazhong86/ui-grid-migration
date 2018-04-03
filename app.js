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
    columnDefs: [{
        name:'actions',
        displayName:'Actions',
        cellTemplate:'<a ng-click="grid.appScope.testFunction()" class="action-icons view-icons-gray" title="View"></a>'
                      +'<a ng-click="grid.appScope.testFunction()" class="action-icons edit-icons-gray" title="Manage"></a>'
                      +'<a ng-click="grid.appScope.testFunction()" class="action-icons copy-icons-gray" title="Duplicate Request"></a>'
                      +'<a ng-click="grid.appScope.testFunction()" class="action-icons delete-icons-gray" title="Cancel"></a>'
                      +'<a ng-click="grid.appScope.testFunction()" title="Claim Project" class="btn claim-btn">Claim</a>'
                      +'<a ng-click="grid.appScope.testFunction()" class="action-icons approve-costs-icons-gray" title="Approve Costs"></a>'
      },
      {
        name:'projectId',
        displayName:'Project Id'
        
      },
      {
        name:'projectState',
        displayName:'Project State'
      },
      {
        name:'submitter',
        displayName:'Submitter'
      },
      {
        name:'request.comments',
        displayName:'Comments'
      }]
  }

  function fakeI18n(title){
    return $q(function(resolve) {
      $interval(function() {
        resolve( 'col: ' + title );
      }, 1000, 1);
    });
  }

  $scope.testFunction = function(){
    alert("Hello\nHow are you?");
  }

  /*($http.get('map_hpe_db.projects.json')
  .then(function(response){
    console.log(response.data)
    $scope.appData = angular.copy(response.data);
    console.log($scope.appData)
  });*/
  

}
