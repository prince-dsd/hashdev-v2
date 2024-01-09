const express = require('express');
const { authService } = require('../../services');
const { profileController } = require('../../controllers');
const { profileValidation } = require('../../validations');

// mergeParams allows access to other/nested router params
const router = express.Router({ mergeParams: true });

// Public routes
router.route('/').get(profileController.getByUsername, profileController.getProfile);
router.route('/all').get(profileController.getAllProfiles);

// All routes after this middleware are protected
router.use(authService.protect);

router
    .route('/me')
    .get(profileController.getMe, profileController.getProfile)
    .post(
        authService.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.createProfile,
    )
    .patch(
        authService.restrictTo('admin', 'user'),
        profileValidation.updateProfile,
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.updateProfile,
    )
    .delete(
        authService.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.deleteProfile,
    );

router
    .route('/portfolio')
    .post(
        authService.restrictTo('admin', 'user'),
        profileValidation.updatePortfolio,
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.addPortfolioItem,
    );

router
    .route('/portfolio/:portId')
    .patch(
        authService.restrictTo('admin', 'user'),
        profileValidation.updatePortfolio,
        profileController.getMe,
        profileController.uploadProfileImages,
        profileController.prepareProfileImages,
        profileController.updatePortfolioItem,
    )
    .delete(
        authService.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.removePortfolioItem,
    );

router
    .route('/:id/star')
    .patch(
        authService.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.toggleStar,
    );
router
    .route('/:id/watch')
    .patch(
        authService.restrictTo('admin', 'user'),
        profileController.getMe,
        profileController.toggleWatch,
    );

// Restrict the following routes to admin users only
router.use(authService.restrictTo('admin'));

router
    .route('/')
    .post(profileController.createProfileAdmin)
    .patch(profileController.updateProfile)
    .delete(profileController.deleteProfile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Profile management and retrieval
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: get profile for user
 *     tags: [Profile]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *             type: string
 *         description: User name
 * 
 *     responses:
 *      "200":
 *        description: OK
 *        content: 
 *         application/json:
 *          schema:
 *            $ref:'#/components/schemas/Profile'
 *      "403":
 *         $ref: '#/components/responses/Forbidden'
 *      "404":
 *         $ref: '#/components/responses/NotFound'

 */
