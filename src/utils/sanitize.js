const { body } = require('express-validator');
const normalize = require('normalize-url');

exports.normalizeUrls = fields =>
    fields.map(field =>
        body(field)
            .if(body(field).exists())
            .customSanitizer(value => value && normalize(value, { forceHttps: true })),
    );