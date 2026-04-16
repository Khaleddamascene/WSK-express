/**
 * @api {get} /cats Get all cats
 * @apiName GetCats
 * @apiGroup Cats
 *
 * @apiSuccess {Object[]} cats List of cats
 * @apiSuccess {Number} cats.cat_id Cat ID
 * @apiSuccess {String} cats.cat_name Name
 * @apiSuccess {Number} cats.weight Weight
 * @apiSuccess {Number} cats.owner Owner ID
 * @apiSuccess {String} cats.filename Image filename
 * @apiSuccess {String} cats.birthdate Birthdate
 */

/**
 * @api {get} /cats/:id Get cat by ID
 * @apiName GetCatById
 * @apiGroup Cats
 *
 * @apiParam {Number} id Cat ID
 *
 * @apiSuccess {Object} cat Cat object
 */

/**
 * @api {post} /cats Create new cat
 * @apiName CreateCat
 * @apiGroup Cats
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiBody {String} cat_name 3-50 characters
 * @apiBody {Number} weight Weight
 * @apiBody {Number} owner Owner ID
 * @apiBody {String} birthdate Date
 * @apiBody {File} cat Image file (max 10MB)
 *
 * @apiSuccess {String} message Cat added
 */

/**
 * @api {put} /cats/:id Update cat
 * @apiName UpdateCat
 * @apiGroup Cats
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id Cat ID
 *
 * @apiSuccess {String} message Cat updated
 */

/**
 * @api {delete} /cats/:id Delete cat
 * @apiName DeleteCat
 * @apiGroup Cats
 *
 * @apiHeader {String} Authorization Bearer token
 *
 * @apiParam {Number} id Cat ID
 *
 * @apiSuccess {String} message Cat deleted
 */
