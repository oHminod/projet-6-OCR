/**
 * * Class ApiError :
 * Classe qui renvoi une nouvelle erreur
 * en fonction de la méthode appelée.
 */
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    /**
     * Défini le message de l'erreur 400
     * @param {String} msg Message de l'erreur
     * @returns Nouvelle erreur de l'API
     */
    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    /**
     * Défini le message de l'erreur 401
     * @param {String} msg Message de l'erreur
     * @returns Nouvelle erreur de l'API
     */
    static unauthorized(msg) {
        return new ApiError(401, msg);
    }

    /**
     * Défini le message de l'erreur 404
     * @param {String} msg Message de l'erreur
     * @returns Nouvelle erreur de l'API
     */
    static notFound(msg) {
        return new ApiError(404, msg);
    }

    /**
     * Défini le message de l'erreur 500
     * @param {String} msg Message de l'erreur
     * @returns Nouvelle erreur de l'API
     */
    static internal(msg) {
        return new ApiError(500, msg);
    }
}

module.exports = ApiError;
