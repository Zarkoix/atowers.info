var atowers = angular.module('atowersApp', ['ngRoute'])
atowers.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/index', {
			templateUrl: 'templates/index.html',
			controller: 'index'
		}).
		when('/resume', {
			templateUrl: 'templates/resume.html',
			controller: 'resume'
		}).
		when('/projects', {
			templateUrl: 'templates/projects.html',
			controller: 'projects'
		}).
		when('/breaks', {
			templateUrl: 'templates/breaks.html',
			controller: 'breaks'
		}).
		when('/blog', {
			templateUrl: 'templates/blog.html',
			controller: 'blog'
		}).
		otherwise('/index')
	}
])
atowers.controller('index', function($scope) {

})

atowers.controller('projects', function($scope) {

})

atowers.controller('breaks', function($scope) {
  $('select').material_select()

	$scope.calculate = function() {
		let teams = $('#teams').val()
		let rounds = $('#rounds').val()
		let clearTo = $('#clearTo').val()
		if(!teams){
			Materialize.toast('Please input number of teams!', 3000)
			return
		}
		if(!rounds){
			Materialize.toast('Please input a number of rounds!', 3000)
			return
		}
		if(!clearTo){
			Materialize.toast('What round does this clear to?', 3000)
			return
		}
		console.log('Pool: ' + teams)
		console.log('nRounds: ' + rounds)
		console.log('nClear: ' + clearTo)

		$scope.explanation = interpretResults(runSimulation(rounds, teams, clearTo), rounds)
	}


	function simulateRound(b, arr){
		console.log('round simulated: ' + b)
	    var ret = new Array(b + 1)
	    for(var i = b; i >= 0; i--) ret[i] = 0

	    for(var i = b - 1; i >= 0; i--){
	      //console.log('calculating the ' + i + ' win bracket, number of debaters: ' + arr[i])
	      if(arr[i] % 2 === 0) { //if even # of teams
	        //console.log(arr[i] + ' is even no pullup neccessary')
	        ret[i + 1] += arr[i] / 2
	        ret[i] += arr[i] / 2
	      } else {
	        //console.log(arr[i] + ' is odd, pulling up a debater from the ' + (i - 1) + ' bracket')
	        ret[i + 1] += (arr[i] + 1) / 2
	        ret[i] += (arr[i] - 1)/ 2
	      }
	    }
	    //console.log('End of round ' + b + ': ' + ret)
	    return ret
	}

	function runSimulation(c, pool, nClear){
		console.log(c + ' ' + pool + ' ' + nClear)
	  var p = distribute(pool)
	  for(var i = 3; i <= c; i++) {
			p = simulateRound(i, p)
		}
	  return fillBracket(nClear, p)
	}

	function distribute(pool){
	  return [Math.round(pool/4), Math.round(pool/2), Math.round(pool/4)]
	}

	function fillBracket(nClear, arr){
	  var t = 0
	  for (i = arr.length; i >= 0; i--) {
	    t += arr[i - 1]
	    if (t > nClear) {
	      return [i-1, arr[i - 1] - t + Number(nClear), arr[i - 1]]
	    }
	  }
	}

	function interpretResults(arr, nR) {
	  return 'Approximately ' + arr[1] + ' of ' + arr[2] + ' debaters with a ' + arr[0] + '-' + (nR - arr[0]) + ' record will clear.'
	}
})

atowers.controller('resume', function($scope) {
	$(document).ready(function(){
			$('#modal1').modal()
		})
})
