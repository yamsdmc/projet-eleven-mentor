import Joi from "joi";

export const addLikeSchema = Joi.object({
    id: Joi.number()
        .min(1)
        .required()
        .messages({
            "string.base": `"id" should be a type of 'number'`,
            "string.empty": `"id" cannot be an empty field`,
            "any.required": `"id" is a required.`,
        }),
});
