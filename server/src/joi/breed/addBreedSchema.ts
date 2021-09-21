import Joi from "joi";

export const addBreedSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(1)
        .required()
        .messages({
            "string.base": `"name" should be a type of 'text'`,
            "string.empty": `"name" cannot be an empty field`,
            "any.required": `"name" is a required.`,
        }),
    description: Joi.string()
        .alphanum()
        .min(1)
        .required()
        .messages({
            "string.base": `"description" should be a type of 'text'`,
            "string.empty": `"description" cannot be an empty field`,
            "any.required": `"description" is a required.`,
        }),
    image: Joi.required(),
});
