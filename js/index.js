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

atowers.controller('resume', function($scope) {

})
