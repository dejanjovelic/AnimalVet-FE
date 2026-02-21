import React from "react";

export default function HandleError(error, setErrorMessage, setShowError, badRequestmessage = "", NotFoundMessage = "", entity = "Item") {
    if (error.response && error.response.status) {
        switch (error.response.status) {
            case 400:
                setErrorMessage(`${badRequestmessage}. Please check your input and try again.`);
                break;
            case 401:
                setErrorMessage("Invalid credentials. Please try log in again.");
                break;
            case 403:
                setErrorMessage("You do not have permission to access this resource.");
                break;
            case 404:
                setErrorMessage(`${NotFoundMessage} was not found.`);
                break;
            case 409:
                setErrorMessage(`${entity} already exist.`);
                break;
            case 500:
                setErrorMessage("Server is temporarily unavailable. Please refresh or try again later.");
                break;
            default:
                setErrorMessage(`Error: ${error.status}`);
        }
    } else if (error.request) {
        setErrorMessage("The server is not responding. Please try again later.");
    } else {
        setErrorMessage("Something went wrong. Please try again.");
    }
    if (setShowError) {
        setShowError(true);
    }

    console.log(`An error occurred while processing ${entity}:`, error);
}

/*U .jsx fajlu se stavlja:

   catch (error) {
   HandleError(
      error,
      setErrorMessage,
      setShowError,
      setIsLoading,
      "",       // badRequestMessage
      `User with email: ${formData.email}`,         // NotFoundMessage
      "User"        // entity
   );
}
   
*/