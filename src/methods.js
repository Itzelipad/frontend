export default { 
    updateProperties (user,userInfo){
        user.id = userInfo.id;
        user.name = userInfo.name;
        user.admin = userInfo.admin;
        user.reception = userInfo.reception_id;
    },
    deleteProperties (user){
        user.id = null;
        user.name = null;
        user.admin = null;
        user.reception = null;
    }
}