class errorService {
  constructor() {
    this.errors = {
      // SERVER ERRORS
      // server error
      SERVER_ERROR: { code: 500, message: 'server.error' },
      // equest entity is larger than limits defined by server.
      SERVER_ERROR_PAYLOADTOOLARGE: { code: 413, message: 'server.error.payloadtoolarge' },
      SERVER_ERROR_NOTFOUND: { code: 404, message: 'server.error.notfound' },

      // SERVICE AND FUNCTION ERRORS
      // encryption error
      SERVICE_ERROR_ENCRYTION: { code: 500, message: 'server.error.service.encryption' },
      // settimestamp error
      SERVICE_ERROR_SETTIMESTAMP: { code: 500, message: 'server.error.settimestamp'},

      // DATABASE ERRORS
      // database error
      DATABASE_ERROR: { code: 500, message: 'server.error.database' },
      // foreign key error
      DATABASE_FOREIGNKEY_ERROR: { code: 500, message: 'server.error.database.foreignkey' },

      // CLIENT ERRORS
      // form validation error
      SERVICE_ERROR_FORM_VALIDATION: { code: 400, message: 'server.error.form.validation' },

    }
  }

  handleError(errorCode, errorMessage, customMessage) {
    //write a code to log the error
    console.log(errorCode + ' -> ' + errorMessage + ' -> ' + customMessage)
  }
}

module.exports = new errorService();
