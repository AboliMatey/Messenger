
var app = angular.module('myApp', ['ui.bootstrap']);
app.controller('myCtrl', function($scope, $http, $timeout, $interval, $q) {

    $scope.messenger_service_url =localStorage.getItem("serverAddress") 

    $scope.usrid = localStorage.getItem("usrid")
    $scope.usrtkn = localStorage.getItem("token")
    $scope.other_cont_id = localStorage.getItem("other_cont_id")

    $scope.userinfo = []
    $scope.sviews = []
    $scope.gviews = []
    $scope.contid = null
    $scope.continfo = []

    $scope.othercontinfo = []
    
    $scope.logout = function(){
        console.log("hell")
        $http(
            {
                url: $scope.messenger_service_url + '/userValidation',
                method: 'PUT',
                headers : {
                    'Content-Type':'application/json'
                },
                data : {
                    Session_id : $scope.usrtkn,
                    Email : $scope.userinfo.email,
                    User_id : $scope.usrid
                }
            }
        ).then(
            function (response) {
                console.log(response.data)
                localStorage.removeItem("usrid")
                localStorage.removeItem("token")
                localStorage.removeItem("other_cont_id")
                window.open("../messenger_service.html","_self")
            }
        )
    }

    $scope.get_user_info = function() {
        $http(
            {
                url: $scope.messenger_service_url + '/user',
                method: 'GET',
                params: {
                    sessionid: $scope.usrtkn,
                    userid : $scope.usrid
                }
            }
        ).then(
            function (response) {
                console.log(response)
                $scope.userinfo = response.data
                $scope.contid = $scope.userinfo.cont_id
                $scope.get_cont_info()
            }
        )
    }

    $scope.get_cont_info = function() {
        $http(
            {
                url: $scope.messenger_service_url + '/user',
                method: 'PUT',
                params: {
                    operation : "continfo"
                },
                headers : {
                    'Content-Type':'application/json'
                },
                data : {
                    Session_id : $scope.usrtkn,
                    cont_id : $scope.contid
                }
            }
        ).then(
            function (response) {
                console.log(response.data)
                $scope.continfo = response.data
                $scope.sviews = $scope.continfo.sviews
                $scope.gviews = $scope.continfo.gviews
            }
        )
    }

    $scope.show_other_info = function(cont_id){
        localStorage.setItem("other_cont_id",cont_id)
        localStorage.setItem("cont_id",$scope.contid)
        window.open("other_user_info.html","_self")
    }

    $scope.other_info = function(other_cont_id) {
        console.log(other_cont_id,$scope.usrid,$scope.usrtkn)
        $http(
            {
                url: $scope.messenger_service_url + '/user',
                method: 'PUT',
                params: {
                    operation : "otherinfo"
                },
                headers : {
                    'Content-Type':'application/json'
                },
                data : {
                    User_id : $scope.usrid,
                    Session_id : $scope.usrtkn,
                    Other_cont_id : $scope.other_cont_id,
                }
            }
        ).then(
            function (response) {
                console.log(response.data)
                $scope.othercontinfo = response.data
            }
        )
    }

    $scope.group_info = function(grp_id) {  
        localStorage.setItem("curr_grp_id",grp_id)
        localStorage.setItem("cont_id",$scope.contid)
        localStorage.removeItem("other_cont_id")
        window.open("grp_info.html","_self") 
    }

    $scope.back_to_chat = function(){
        localStorage.removeItem("other_cont_id")
        window.open("user_profile.html","_self")
    }
    $scope.get_user_info()
    $scope.other_info()
});
