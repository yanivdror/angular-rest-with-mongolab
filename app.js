	(function() {

//Globals

		var name = "myApp",
			requires = ['ngRoute'],
			myApp = null,
			url ="https://api.mongolab.com/api/1/databases/my-academy/collections/course",
			config = {params:{apiKey:"8w19XWoI1u9evDYqoWwR1on4TebbD_mo"}};
			
		
		myApp = angular.module(name, requires);

		myApp.config(function($routeProvider){
			$routeProvider
				.when("/courses",{
					templateUrl:"partials/course_list.html",
					controller:"CourseCtrl"
				})
				.when("/course/add",{
					templateUrl:"partials/add_course.html",
					controller:"CourseCtrl"
				})
				.when("/course/edit/:id",{
					templateUrl:"partials/edit_course.html",
					controller:"CourseCtrl"
				})								
				.otherwise({
					redirectTo:"/courses"
				});
		});

//START service		

		myApp.factory("courseDataSvc", function($http,$q){

			function qDeferInit($q){
				return $q.defer();
			}			
			

			return {

				getCourses:function(){

					var deferred = qDeferInit($q);				

					$http.get(url,config)
						.success(function(data){
							deferred.resolve(data);								
						})
						.error(function(err){
							deferred.reject(err);							
						});

					return deferred.promise;	
				},
				addCourse:function(course){

					var deferred = qDeferInit($q);						

					$http.post(url,course,config)
						.success(function(data){
							deferred.resolve(data);								
						})
						.error(function(err){
							deferred.reject(err);							
						});

					return deferred.promise;										
				},
				updateCourse:function(courseToEdit){

					var deferred = qDeferInit($q);
					var id = courseToEdit._id.$oid;

					$http.put(url+"/"+id,courseToEdit,config)
						.success(function(data){
							deferred.resolve(data);								
						})
						.error(function(err){
							deferred.reject(err);							
						});

					return deferred.promise;											
				},
				deleteCourse:function(course){

					var deferred = qDeferInit($q);
					var id = course._id.$oid;

					$http.delete(url+"/"+id,config)
							.success(function(data){
								deferred.resolve(data);								
							})
							.error(function(err){
								deferred.reject(err);							
							});

						return deferred.promise;					
					},
				getCourseById:function(id){

					var deferred = qDeferInit($q);

					$http.get(url+"/"+id,config)
						.success(function(data){
							deferred.resolve(data);								
						})
						.error(function(err){
							deferred.reject(err);							
						});

					return deferred.promise;					

				}
			}
		});
//END service

//START controller

		myApp.controller("CourseCtrl", function($scope,courseDataSvc,$location,$routeParams) {
		    $scope.courses = [];
			

			if($routeParams.id !== undefined){

				courseDataSvc.getCourseById($routeParams.id).then(

					function(data){
						$scope.courseToEdit = data;
					},
					function error(e){
					console.log("Error "+e);
				});
			}
			
			// to load all courses
			$scope.loadCourses = function() {

				courseDataSvc.getCourses().then(

				function (data){
					$scope.courses = data;
				},
				function error(e){
					console.log("Error "+e);
				});



			}

			$scope.loadCourses();

			$scope.addCourse = function(course){

				courseDataSvc.addCourse(course).then(

					function(data){
						console.log("added successfully "+JSON.stringify(data));
						$scope.loadCourses();
						$location.path("/courses");
					},
					function error(e){
					console.log("Error "+e);
				});
			}

			$scope.updateCourse = function(courseToEdit){

				courseDataSvc.updateCourse(courseToEdit).then(

					function(data){
						console.log("updated successfully "+JSON.stringify(data));
						$scope.loadCourses();
						$location.path("/courses");						
					},
					function error(e){
					console.log("Error "+e);
				});
			}

			$scope.deleteCourse = function(course){

				courseDataSvc.deleteCourse(course).then(

					function(data){
						//console.log("deleted successfully "+JSON.stringify(data));
						$scope.loadCourses();
					},
					function error(e){
					console.log("Error "+e);
				});
			}			
			
		});

//END controller



	}());