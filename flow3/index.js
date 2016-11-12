var flow3App = angular.module('flow3App', [])


flow3App.controller('ngFlow3', function ngFlow3($scope) {
  $('.modal').modal()
  $scope.dataL = []
  $scope.dataR = []
  $scope.title
  $scope.version = '0.1.2'
  $scope.isSaved = false

  if(localStorage){
    if(localStorage.version) {
      if(localStorage.version === $scope.version) {
        if(localStorage.nF !== 0 ){
          Materialize.toast(localStorage.nF + ' flows loaded', 3000)
        } else {
          Materialize.toast('No flows loaded', 3000)
        }
      } else {
        //handle version out of date
      }
    } else {
      localStorage.version = $scope.version
      localStorage.nF = 0
      Materialize.toast('First Load', 4000)
    }
  } else {
    console.log('flow3 requires a browser with localstorage')
  }

  $scope.upload = function () {
    $('#ulModal').modal('open')
  }

  $scope.openFromLS = function (n) {
    var f = JSON.parse(localStorage[n]).flow3
    console.log(f)
    $scope.dataL = f.left
    $scope.dataR = f.right
    $scope.title = f.name
    $scope.isSaved = n
    $('#lsManagerModal').modal('close')
  }

  $scope.save = function () {
    if(localStorage) {
      if($scope.isSaved) {
        localStorage[$scope.isSaved] = JSON.stringify($scope.document())
      } else {
        var n = Number(localStorage.nF) + 1
        localStorage[n] = JSON.stringify($scope.document())
        localStorage.nF = n
        $scope.isSaved = n
      }
      Materialize.toast('Saved', 4000) // 4000 is the duration of the toast
    } else {
      Materialize.toast('Needs localStorage', 4000) // 4000 is the duration of the toast
    }
  }

  $scope.download = function () {
    $scope.dlLink = makeTextFile(JSON.stringify($scope.document()))
    $('#dlModal').modal('open')
  }

  $scope.document = function () {
    return {flow3: {version: $scope.version, name: $scope.title, left: $scope.dataL, right: $scope.dataR}}
  }

  $scope.lsManagerOpen = function () {
    if(localStorage){
      $('#lsManagerModal').modal('open')
    } else {
      Materialize.toast('Needs localStorage', 4000) // 4000 is the duration of the toast
    }
  }

  function makeTextFile (text) {
    var data = new Blob([text], {type: 'octet/stream'})
    return window.URL.createObjectURL(data)
  }
})

flow3App.controller('lsManager', function lsManager($scope) {
  if(localStorage){
    loadFlows()
  } else {
    $scope.message = 'Browser must have localStorage for this feature to be enabled'
  }
  $('#delConfirmation').modal()
  $('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrain_width: false, // Does not change width of dropdown to that of the activator
     hover: false, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: false, // Displays dropdown below the button
     alignment: 'left' // Displays dropdown with edge aligned to the left of button
   }
 )

  function loadFlows () {
    $scope.flows = []
    for(var i = 1; i <= localStorage.nF; i++){
      var f = JSON.parse(localStorage[i]).flow3
      $scope.flows.push({name: f.name, version: f.version, id: i})
    }
  }

  $scope.open = function (n) {
    console.log('trying to open flow: ' + n)
    $scope.$parent.openFromLS(n)
  }

  $scope.beginDelete = function (n) {
    $scope.deleting = n
    console.log('begin deleting flow: ' + n)
    $('#delConfirmation').modal('open')
  }

  $scope.completeDelete = function () {
    console.log('deleting flow: ' + $scope.deleting)
    for(var i = $scope.deleting; i < localStorage.nF; i++) localStorage[i] = localStorage[i+1]
    localStorage[localStorage.nF] = {}
    localStorage.nF -= 1
    loadFlows()
  }
})

flow3App.controller('ulManager', function ulManager($scope) {

  $scope.onChange = function () {
    var input = event.target

    $scope.reader = new FileReader()
    $scope.reader.openFile = function(){
      console.log('ok 3then')
    }

    function openFile () {
      console.log('ok 2then')

    }

    $scope.reader.onload = function(){
      console.log('ok then')
      var dataURL = $scope.reader.result
      var output = document.getElementById('output')
      output.src = dataURL
    }
    $scope.reader.readAsDataURL(input.files[0])
  }

})

flow3App.config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|blob|mailto|chrome-extension):/);
    }
])

flow3App.directive('box', function() {
  return {
    restrict: 'AE',
    scope: {
      tag: '=',
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
    restrict: 'AE',
    transclude: true,
    scope: {
      boxes: '='
    },
    controller: function () {
      $('.tooltipped').tooltip({delay: 50})
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

flow3App.directive('flow', function() {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    controller: function () {
      this.newContention = function() {
        this.data.push({"title": "", "args": []})
      }
    },
    controllerAs: 'f',
    bindToController: true,
    templateUrl: 'flow.html'
  }
})
