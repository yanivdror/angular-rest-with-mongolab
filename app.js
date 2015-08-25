	(function() {

//Globals

		var name = "myApp",
			requires = [],
			myApp = null,
			url ="https://api.mongolab.com/api/1/databases/my-academy/collections/course",
			config = {params:{apiKey:"8w19XWoI1u9evDYqoWwR1on4TebbD_mo"}};
			
		
		myApp = angular.module(name, requires);

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
				}
			}
		});
//END service

//START controller

		myApp.controller("AppCtrl", function($scope,$http,courseDataSvc) {
		    $scope.courses = [];
			
			// variables for toggling view states
			$scope.toggleAddCourseView = false;
			$scope.toggleEditCourseView = false;
			
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

			$scope.addCourse = function(course){

				courseDataSvc.addCourse(course).then(

					function(data){
						console.log("added successfully "+JSON.stringify(data));
						$scope.loadCourses();
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

			$scope.editCourse = function(course){
				$scope.toggleEditCourseView = true;
				$scope.courseToEdit = angular.copy(course);
			}
			
			$scope.toggleAddCourse = function(flag) {
				$scope.toggleAddCourseView = flag;
			}
			
			$scope.toggleEditCourse = function(flag) {
				$scope.toggleEditCourseView = flag;
			}
		});

//END controller



	}());