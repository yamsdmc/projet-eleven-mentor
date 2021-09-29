import Joi from "joi";

export const breedIdSchema = Joi.object({
    breedId: Joi.number()
        .min(1)
        .required()
        .messages({"string.base": `"id" should be a type of 'number'`}),
});
