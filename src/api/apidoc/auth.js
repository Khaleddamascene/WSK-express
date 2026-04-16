/**
 * @api {post} /auth/login Login user
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {String} username Username
 * @apiBody {String} password Password
 *
 * @apiSuccess {Object} user User object
 * @apiSuccess {String} token JWT token
 */

/**
 * @api {get} /auth/me Get current user
 * @apiName GetMe
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiSuccess {String} message Token valid
 * @apiSuccess {Object} user User info from token
 */
