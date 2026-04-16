/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} users List of users.
 * @apiSuccess {Number} users.user_id User ID.
 * @apiSuccess {String} users.username Username.
 * @apiSuccess {String} users.email Email.
 * @apiSuccess {String} users.name Full name.
 * @apiSuccess {String} users.role User role.
 */

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiBody {String} username 3-20 chars, alphanumeric
 * @apiBody {String} email valid email
 * @apiBody {String} password min 8 chars
 *
 * @apiSuccess {String} message User created successfully
 */

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {String} message User updated successfully
 */

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {String} message User deleted successfully
 */
