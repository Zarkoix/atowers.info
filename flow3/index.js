var flow3App = angular.module('flow3App', [])


flow3App.controller('ngFlow3', function ngFlow3($scope) {
  $scope.flow = []

  $scope.newContention = function() {
    $scope.flow.push({"title": "", "args": []})
  }
})

flow3App.directive('box', function() {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      text: '=',
      type: '=',
      index: '=',
      remove: '&'
    },
    controller: function () {
      this.color = function (type) {
        if(type == 'extension') return 'blue accent-1'
        if(type == 'response') return 'red accent-1'
        if(type == 'arrow') return 'green accent-1'
        return ''
      }

      this.rm = function () {
        this.remove({index: this.index});
      }
    },
    controllerAs: 'b',
    bindToController: true,
    templateUrl: 'box.html'
  }
})

flow3App.directive('arguement', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      boxes: '='
    },
    controller: function () {
      this.extend = function() {
        this.boxes.push({"type": "extension", "text": ""})
      }

      this.respond = function() {
        this.boxes.push({"type": "response", "text": ""})
      }

      this.arrow = function() {
        this.boxes.push({"type": "arrow"})
      }

      this.remove = function(index) {
        this.boxes.splice(index, 1)
      }
    },
    controllerAs: 'a',
    bindToController: true,
    templateUrl: 'arg.html'
  }
})

flow3App.directive('contention', function() {
  return {
    restrict: 'E',
    scope: {
      args: '=',
      title: '='
    },
    controller: function () {
      this.newArg = function () {
        this.args.push([{"title": "", "text": "", "type": "constructive"}])
      }
    },
    controllerAs: 'c',
    bindToController: true,
    templateUrl: 'contention.html'
  }
})
