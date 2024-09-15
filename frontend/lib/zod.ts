import { ZodSchema } from "zod";

const flattenErrors =(errorFormat)  =>{
    const flatErrors = {} ;
    
    for (const key in errorFormat) {
      if (errorFormat[key]._errors && errorFormat[key]._errors.length > 0) {
        flatErrors[key] = errorFormat[key]._errors[0]; // Take the first error message
      }
    }
  
    return flatErrors;
  }

export const validateFormData = (data:object, schema:ZodSchema) => {
  
    const result = schema.safeParse(data);
  
    if (result.success) {
      return { valid: true, errors: null, data: result.data };
    } else {
      // Collecting the errors in a structured format
      const errors = flattenErrors(result.error.format());
  
      return { valid: false, errors, data: null };
    }
  }