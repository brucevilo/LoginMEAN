
angular.module('authService',[])
.factory('Auth',function($http)
{
    authFactory={};
    authFactory.login=function(loginData){
       return $http.post('/api/authenticate',loginData);
    }
    return authFactory;
});
