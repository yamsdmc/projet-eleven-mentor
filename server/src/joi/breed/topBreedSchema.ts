import Joi from "joi";

export const topBreedSchema = Joi.object({
    limit: Joi.number().min(1),
});
