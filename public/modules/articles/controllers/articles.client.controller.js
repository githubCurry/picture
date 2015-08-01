'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$http','$scope', '$stateParams', '$location', 'Authentication', 'Articles',
    function($http,$scope, $stateParams, $location, Authentication, Articles) {
        $scope.authentication = Authentication;
        $scope.index = 1;
        $scope.content = {
        	pic:""
        }
        $scope.form1="";
        $scope.text = "";
        $scope.sub = false;

        $scope.submitInfo = function(){
            var info =  this.text;
            $http.post("text",{
                    text:info
            }).success(function(data){
                $("#form1").submit();
            })
        }

        $scope.uploadFile = function(event, obj) {
            var files = event.target.files;

            if (obj.files && obj.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(obj.files[0]);
                reader.onload = function(e) {
                	var entity = "pic";
                    $scope.content[entity] = this.result;
                    $scope.$apply()
                }
            }
        };

        $scope.create = function() {
            var article = new Articles({
                title: this.title,
                content: this.content
            });

            article.$save(function(response) {
                $location.path('articles/' + response._id);
                $scope.title = '';
                $scope.content = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Article
        $scope.remove = function(article) {
            if (article) {
                article.$remove();

                for (var i in $scope.articles) {
                    if ($scope.articles[i] === article) {
                        $scope.articles.splice(i, 1);
                    }
                }
            } else {
                $scope.article.$remove(function() {
                    $location.path('articles');
                });
            }
        };

        // Update existing Article
        $scope.update = function() {
            var article = $scope.article;

            article.$update(function() {
                $location.path('articles/' + article._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function() {
            $scope.articles = Articles.query();
        };

        // Find existing Article
        $scope.findOne = function() {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };
    }
]);
