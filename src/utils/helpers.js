export function extractErrors(response) {

    if(Object.prototype.hasOwnProperty.call(response, 'error')) {
      return [response.error];
    }

    let errors = [];

    for (var error in response) {

      if (!Object.prototype.hasOwnProperty.call(response, error)) {
          continue;
      }
  
      errors = [...errors, ...response[error]];
      
    }
  
    return errors;
  }