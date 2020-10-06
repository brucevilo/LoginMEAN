angular.module('userService',[])
.factory('User',function($http)
{
    userFactory={};
   
    userFactory.create=function(reqData){
       return $http.post('/api/user',reqData);
    }
    return userFactory;
});
