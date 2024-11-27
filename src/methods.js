export default {
    updateProperties(user, userInfo) {
        user.id = userInfo.id;
        user.name = userInfo.name;
        user.admin = userInfo.admin;
        user.reception = userInfo.reception_id;
    },
    deleteProperties(user) {
        user.id = null;
        user.name = null;
        user.admin = null;
        user.reception = null;
    },
    deleteAuxProperties(auxiliar) {
        auxiliar.id = null;
        auxiliar.name = null;
        auxiliar.admin = null;
        auxiliar.reception = null;
        auxiliar.vinculacion = null;
        auxiliar.edificio = null;
        auxiliar.numero = null;
    }
}