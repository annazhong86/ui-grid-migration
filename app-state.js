angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $transitions){

        var uiGrid = {
            name:'uiGrid',
            url:'/uigrid',
            templateUrl:'ui-grid.html',
            controller: 'MainCtrl'
        }

        var stateSaveTest = {
            name:'stateSaveTest',
            url:'/statesavetest',
            templateUrl:'state-save-test.html',
            controller: 'MainCtrl'
        }

        $stateProvider.state(uiGrid);
        $stateProvider.state(stateSaveTest);
        $urlRouterProvider.otherwise('/uigrid');

        $transitions.onSuccess({}, function(){
            
        })
    });
    

