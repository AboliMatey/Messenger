
var app = angular.module('myApp', ['ui.bootstrap']);
app.controller('myCtrl', function($scope, $http, $timeout, $interval, $q) {



    $scope.messenger_service_url =localStorage.getItem("serverAddress") //"http://127.0.0.1/gameservice"
    
    $scope.addlist = []
    $scope.removelist = []
    $scope.makeadminlist = []
    $scope.members_but_not_admin = []
    $scope.newlist = []
    $scope.allmemberlist = []
    $scope.grpid = localStorage.getItem("curr_grp_id")
    $scope.currgrpinfo = []
    $scope.contid = localStorage.getItem("cont_id")
    $scope.continfo = []
    $scope.usrid = localStorage.getItem("usrid")
    $scope.usrtkn = localStorage.getItem("token")


    $scope.back = function(){
        localStorage.removeItem("curr_grp_id")
        localStorage.removeItem("cont_id")
        window.open("user_profile.html","_self")
    }

    $scope.show_other_info = function(cont_id){
        localStorage.setItem("other_cont_id",cont_id)
        localStorage.removeItem("curr_grp_id")
        window.open("other_user_info.html","_self")
    }

    $scope.leave_group = function() {    /// not working properly
        var flag = 0
        var len = $scope.currgrpinfo.group_admins.length
        for(i=0;i<len;i++){
            if ($scope.currgrpinfo.group_admins[i] == $scope.contid) {
                if (len == 1) {
                    flag = 1
                    break
                }
            }
        }
        if (flag == 1) {
           alert("you are the only admin")
            return
        } else {
            $http(
                {
                    url: $scope.messenger_service_url + '/user',
                    method: 'PUT',
                    params: {
                        operation : "leaveGroup"
                    },
                    headers : {
                        'Content-Type':'application/json'
                    },
                    data :    {
                        Cont_id  :  $scope.contid,
                        Group_id :   $scope.grpid,
                        Session_id : $scope.usrtkn, 
                    }
                }
            ).then(
                function (response) {
                    console.log(response.data)
                    $scope.continfo = response.data
                    localStorage.removeItem("curr_grp_id")
                    localStorage.removeItem("cont_id")
                    window.open("user_profile.html","_self")
                }
            )
        }    
    }

    $scope.get_grp_info_by_id = function(){
        $http(
           {
                url: $scope.messenger_service_url + '/group',
                method: 'GET',
                params: {
                    sessionid : $scope.usrtkn,
                    grpid : $scope.grpid
                }
           }
        ).then(
           function (response) {
                console.log(response.data)
                $scope.currgrpinfo = response.data
                $scope.currgrpid = $scope.currgrpinfo._id
                $scope.allmemberlist = $scope.currgrpinfo.group_members 
                $scope.create_new_list()
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
                $scope.get_grp_info_by_id()
            }
        )
    }


    $scope.create_new_list = function() {
        var len = $scope.continfo.cont_list.length
        for(i=0;i<len;i++) {
            var val = $scope.continfo.cont_list[i]
            index1 = $scope.currgrpinfo.group_admins.indexOf(val)
            index2 = $scope.currgrpinfo.group_members.indexOf(val)
            if (index1 == -1 && index2 == -1) {
                $scope.newlist.push(val)
            }   
        }
        for (i=0;i<$scope.currgrpinfo.group_members.length;i++){
            var val = $scope.currgrpinfo.group_members[i]
            index = $scope.currgrpinfo.group_admins.indexOf(val)
            if (index == -1) {
                $scope.members_but_not_admin.push(val)
            }
        }
        console.log($scope.newlist) 
        console.log($scope.members_but_not_admin)
    }

    $scope.make_admin = function(memid) {
        $http(
            {
                url: $scope.messenger_service_url + '/group',
                method: 'PUT',
                params: {
                    operation : "makeAdmin"
                },
                headers : {
                    'Content-Type':'application/json'
                },
                data :    {
                    Admin_id : $scope.contid,
                    Member_id : memid,
                    Group_id :   $scope.currgrpid,
                    Session_id : $scope.usrtkn,
                }
            }
        ).then(
            function (response) {
                console.log(response.data)
                $scope.currgrpinfo = response.data
            }
        )
    }
    
    $scope.add_member = function(memid) {
        $http(
            {
                url: $scope.messenger_service_url + '/group',
                method: 'PUT',
                params: {
                    operation : "addMember"
                },
                headers : {
                    'Content-Type':'application/json'
                },
                data :    {
                    Admin_id : $scope.contid,
                    Member_id : memid,
                    Group_id :   $scope.currgrpid,
                    Session_id : $scope.usrtkn,
                }
            }
        ).then(
            function (response) {
                console.log(response.data)
                $scope.currgrpinfo = response.data
            }
        )
    }
    
    $scope.add_selected_members = function()
    {
     for(i=0;i<$scope.addlist.length;i++){
         $scope.add_member($scope.addlist[i])
     }
     $scope.addlist = []
     console.log($scope.addlist)
     window.open("grp_info.html","_self")
    }

    $scope.remove_selected_members = function()
    {
     for(i=0;i<$scope.removelist.length;i++){
         $scope.rem_member($scope.removelist[i])
     }
     $scope.removelist = []
     console.log($scope.removelist)
     window.open("grp_info.html","_self")
    }
    
    $scope.make_them_admin = function() 
    {
     for(i=0;i<$scope.makeadminlist.length;i++){
         $scope.make_admin($scope.makeadminlist[i])
     }
     $scope.makeadminlist = []
     console.log($scope.makeadminlist)
     window.open("grp_info.html","_self")
    }

    $scope.rem_member = function(memid) {
        $http(
            {
                url: $scope.messenger_service_url + '/group',
                method: 'PUT',
                params: {
                    operation : "remMember"
                },
                headers : {
                    'Content-Type':'application/json'
                },
                data :    {
                    Admin_id : $scope.contid,
                    Member_id : memid,
                    Group_id :   $scope.currgrpid,
                    Session_id : $scope.usrtkn,
                }
            }
        ).then(
            function (response) {
                console.log(response.data)
                $scope.currgrpinfo = response.data
            }
        )
    }

    

    $scope.rename_group = function() {
        $http(
            {
                url: $scope.messenger_service_url + '/group',
                method: 'PUT',
                params: {
                    operation : "renameGroup"
                },
                headers : {
                    'Content-Type':'application/json'
                },
                data :    {
                    Member_id : $scope.contid,
                    New_group_name : $scope.newgroupname,
                    Group_id :   $scope.currgrpid,
                    Session_id : $scope.usrtkn,
                }
            }
        ).then(
            function (response) {
                console.log(response.data)
                $scope.currgrpinfo = response.data
            }
        )
    }

  
  
    $scope.update_add_list = function(c,x) {
        var k 
        if(c == true){
            $scope.addlist.push(x)
        } else {
            k = $scope.addlist.indexOf(x);
            $scope.addlist.splice(k,1);
        }
        console.log($scope.addlist)
    }
    
    $scope.update_remove_list = function(c,x) {
        var k 
        if(c == true){
            $scope.removelist.push(x)
        } else {
            k = $scope.removelist.indexOf(x);
            $scope.removelist.splice(k,1);
        }
        console.log($scope.removelist)
    }
  
    $scope.update_admin_list = function(c,x) {
        var k 
        if(c == true){
            $scope.makeadminlist.push(x)
        } else {
            k = $scope.makeadminlist.indexOf(x);
            $scope.makeadminlist.splice(k,1);
        }
        console.log($scope.makeadminlist)
    }
  

    $scope.get_cont_info()   
    
    
});
