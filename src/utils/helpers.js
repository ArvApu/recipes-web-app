export function extractErrors(response) {

    if(!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      return [response.message];
    }
  
    let errors = [];
  
    for (var error in response.errors) {
      if (!Object.prototype.hasOwnProperty.call(response.errors, error)) {
          continue;
      }
  
      errors = [...errors, ...response.errors[error]];
      
    }
  
    return errors;
  }