const { body } = require('express-validator');
const normalize = require('normalize-url');

const { validateWithExpressValidaor } = require('../middlewares/validate');
const { sanitize } = require('../utils');

const validation = validationRules => [validationRules, validateWithExpressValidaor];



const updateProfileRules = [
    body('socials')
        .if(body('socials').exists())
        .customSanitizer(value => {
            if (value.length > 0) {
                return value.map(el => ({
                    name: el.name,
                    value: normalize(el.value, { forceHttps: true }),
                }));
            }
            return [];
        }),
];

const updatePortfolioRules = [sanitize.normalizeUrls(['repo', 'demo'])];


exports.updateProfile = validation(updateProfileRules);
exports.updatePortfolio = validation(updatePortfolioRules);
// exports.experience = validation(experienceRules);
// exports.education = validation(educationRules);
