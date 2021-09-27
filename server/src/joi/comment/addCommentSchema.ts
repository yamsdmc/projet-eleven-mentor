import Joi from "joi";

export const addCommentSchema = Joi.object({
    pseudo: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    message: Joi.string()
        .alphanum()
        .min(1)
        .required()
        .messages({
            "string.base": `"message" should be a type of 'text'`,
            "string.empty": `"message" cannot be an empty field`,
            "any.required": `"message" is a required.`,
        }),
    breedId: Joi.number()
        .min(1)
        .required()
        .messages({
            "string.base": `"id" should be a type of 'number'`,
            "string.empty": `"id" cannot be an empty field`,
            "any.required": `"id" is a required.`,
        }),
});
