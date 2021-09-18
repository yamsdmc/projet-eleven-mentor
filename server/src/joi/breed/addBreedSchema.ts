import Joi from "joi";

export const addBreedSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    description: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    image: Joi.string()
        .alphanum()
        .min(1)
        .required(),
});
