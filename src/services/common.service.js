const { ApiError, catchAsync, omitKeyValuePairs } = require('../utils');
const QueryHandler = require('../handlers/queryHandler');



const updateOne = async (req, res, next, Model, config, conditions) => {
    const options = config.options || {};
    const errorMessage = config.errorMessage || 'No document found with that ID';
    const fieldsToOmit = config.fieldsToOmit || [];
    const data = omitKeyValuePairs({ ...req.body }, fieldsToOmit);

    const doc = await Model.findOneAndUpdate(conditions, data, {
        new: true,
        runValidators: true,
        ...options,
    });
    if (!doc) {
        return next(new ApiError(404, errorMessage));
    }

    res.status(200).json({
        status: 'success',
        data: {
            [Model.modelName.toLowerCase()]: doc,
        },
    });
};

const getOne = async (req, res, next, Model, config, conditions) => {
    const selectOptions = config.selectOptions || null;
    const populateOptions = config.populateOptions || null;
    const errorMessage = config.errorMessage || 'No document found with that ID';

    let query = Model.findOne(conditions);
    if (selectOptions) query = query.select(selectOptions);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
        return next(new ApiError(404, errorMessage));
    }

    res.status(200).json({
        status: 'success',
        data: {
            [Model.modelName.toLowerCase()]: doc,
        },
    });
};

const deleteOne = async (req, res, next, Model, config, conditions) => {
    const errorMessage = config.errorMessage || 'No document found with that ID';

    if (!(await Model.findOneAndRemove(conditions))) {
        return next(new ApiError(404, errorMessage));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
};

exports.createOne = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        const errorMessage = config.errorMessage || 'Document with that ID already exists';
        const fieldsToOmit = config.fieldsToOmit || [];
        const data = omitKeyValuePairs(req.body, fieldsToOmit);
        const options = config.options || {};

        if (await Model.findById(req.params.id)) {
            return next(new ApiError(400, errorMessage));
        }

        const doc = await Model.create(data, {
            ...options,
        });

        res.status(201).json({
            status: 'success',
            data: {
                [Model.modelName.toLowerCase()]: doc,
            },
        });
    });

exports.updateOneByUserId = (Model, config = {}) =>
    catchAsync(async (req, res, next) =>
        updateOne(req, res, next, Model, config, { user: req.params.userId }),
    );

exports.getOneByUserId = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        getOne(req, res, next, Model, config, { user: req.params.userId });
    });

exports.deleteOneByUserId = (Model, config = {}) =>
    catchAsync(async (req, res, next) => {
        deleteOne(req, res, next, Model, config, { user: req.params.userId });
    });

exports.getAll = (Model, errorMessage = 'No document found with that ID') =>
    catchAsync(async (req, res, next) => {
        const handler = new QueryHandler(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // const doc = await handler.query.explain();
        const doc = await handler.query;
        if (!doc) {
            return next(new ApiError(404, errorMessage));
        }

        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                [Model.collection.name]: doc,
            },
        });
    });