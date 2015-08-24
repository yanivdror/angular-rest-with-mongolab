	(function() {
		var name = "myApp",
			requires = [],
			myApp = null,
			url ="https://api.mongolab.com/api/1/databases/my-academy/collections/course",
			config = {params:{apiKey:"8w19XWoI1u9evDYqoWwR1on4TebbD_mo"}};
		
		myApp = angular.module(name, requires);
		
		myApp.controller("AppCtrl", function($scope,$http) {
		    $scope.courses = [];
			
			// variables for toggling view states
			$scope.toggleAddCourseView = false;
			$scope.toggleEditCourseView = false;
			
			// to load all courses
			$scope.loadCourses = function() {

				$http.get(url,config)
					.success(function(data){
						$scope.courses = data;
					});
			}

			$scope.addCourse = function(course){
				$http.post(url,course,config)
					.success(function(data){
						console.log("added successfully "+JSON.stringify(data));
						$scope.loadCourses();
					});
			}

			$scope.editCourse = function(course){
				$scope.toggleEditCourseView = true;
				$scope.courseToEdit = angular.copy(course);
			}

			$scope.updateCourse = function(courseToEdit){

				var id = courseToEdit._id.$oid;

				$http.put(url+"/"+id,courseToEdit,config)
					.success(function(data){
						console.log("updated successfully "+JSON.stringify(data));
						$scope.loadCourses();
					});
			}

			$scope.deleteCourse = function(course){

				var id = course._id.$oid;

				$http.delete(url+"/"+id,config)
					.success(function(data){
						console.log("deleted successfully "+JSON.stringify(data));
						$scope.loadCourses();
					});
			}
			
			$scope.toggleAddCourse = function(flag) {
				$scope.toggleAddCourseView = flag;
			}
			
			$scope.toggleEditCourse = function(flag) {
				$scope.toggleEditCourseView = flag;
			}
		});
	}());