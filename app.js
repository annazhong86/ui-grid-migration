angular.module('app', [
                        'ngTouch',
                        'ui.router', 
                        'ui.grid', 
                        'ui.grid.pagination',
                        'ui.grid.exporter',  
                        'ui.grid.resizeColumns', 
                        'ui.grid.moveColumns',
                        'ui.grid.pinning',
                        'ui.grid.grouping',
                        'ui.grid.selection',
                        'ui.grid.saveState'
                      ]
  ).controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $interval, $q, $http, appData, $location, $transitions) {
  var vm = this;
  vm.appData = appData;
  vm.gridColumnDefs = [{
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
  }];
  
  vm.gridOptions = {
    paginationPageSizes: [5, 10, 15],
    paginationPageSize: 5,
    data: vm.appData,
    exporterMenuCsv: false,
    enableGridMenu: true,
    gridMenuTitleFilter: fakeI18n,
    exporterExcelFilename: 'ui-grid-migration.xlsx',
    exporterExcelSheetName: 'Sheet1',
    columnDefs:vm.gridColumnDefs,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  if(window.localStorage.getItem('gridState')){
    $scope.restoreState();
  }

  $transitions.onSuccess({from:'uiGrid'}, function(transition){
    $scope.saveState();
  });
  
  //$scope.$on('$locationChangeStart', function(event, url){
    //$scope.saveState();
  //})

  $scope.saveState = function(){
    $scope.state = $scope.gridApi.saveState.save();
    window.localStorage.setItem('gridState',$scope.state)
    console.log($scope.state)
  }

  $scope.restoreState = function(){
    console.log(window.localStorage.getItem('gridState'))
    $scope.state = window.localStorage.getItem('gridState');
    console.log($scope.state)
    $scope.gridApi.saveState.restore($scope, $scope.state);
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
