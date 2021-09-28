import Joi from "joi";

export const commentsSchema = Joi.object({
    limit: Joi.number().min(1),
});
