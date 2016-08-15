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
		when('/post/:postId', {
			templateUrl: 'templates/post.html',
			controller: 'post'
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

atowers.controller('resume', function($scope) {

})

atowers.controller('blog', function($scope) {
	httpGetAsync('http://127.0.0.1:8080/api/first5', function (res) {
		$scope.posts = JSON.parse(res)
		$scope.$apply()
	})
})

atowers.controller('post', function($scope, $routeParams) {
	console.log('asking for: ' + $routeParams.postId)
	httpGetAsync('http://127.0.0.1:8080/api/getPost/' + $routeParams.postId, function (res) {
		$scope.post = JSON.parse(res)
		$scope.$apply()
	})
})

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
