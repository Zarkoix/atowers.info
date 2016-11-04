var flow3App = angular.module('flow3App', [])


flow3App.controller('ngFlow3', function ngFlow3($scope) {
  console.log('idk')
  $scope.flow = []
  $scope.addArg = function() {
    console.log('heheXD')
    $scope.flow.push([[{"type":"extension", "text": ""}]])
  }

  $scope.extend = function(index) {
    $scope.flow[index].push({"type": "extension", "text": ""})
  }

  $scope.respond = function(index) {
    $scope.flow[index].push({"type": "response", "text": ""})
  }

  $scope.arrow = function(index) {
    $scope.flow[index].push({"type": "arrow"})
  }
})

flow3App.directive('box', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attr) {
      console.log(scope.p)
      if(scope.p.type == 'arrow') {
        element.children().prepend('<img class="arrow" src="arrow.svg">')
      }

      element.children().addClass(color(scope.p.type))

      function color(type) {
        if(type == 'extension') return 'blue accent-1'
        if(type == 'response') return 'red accent-1'
        if(type == 'arrow') return 'green accent-1'
        return ''
      }

      scope.remove = function (x){
        scope.arg.splice(x, 1)
      }
    },
    templateUrl: 'box.html'
  }
})
