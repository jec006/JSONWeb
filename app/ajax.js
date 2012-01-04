/**
 *  Sinple functions to create an ajax request to get some json
 */
 
/**
 * This function initializes the xmlHttp variable and returns it.
 *
 * @return null
 */
function initxmlHttpRet() {
	var xmlHttpLocal = null;
	try {
		xmlHttpLocal = new XMLHttpRequest(); 
	}
	catch(e) {
		try {
			xmlHttpLocal = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e) {
			try{
				xmlHttpLocal = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e) {
				alert("Browser does not support AJAX!");
				return null;
			}
		}
	}
	return xmlHttpLocal;
}

/** This function will create a new xmlHttp object and return it after making the ajax call - so that multiple calls can be run in parallel
 *
 * @param functionToGet - function to get
 * @param input - the input
 * @param cbFunction - the callback function 
 *
 * @return xmlHttpLocal or null
 */
function ajax(url, input, cbFunction) {
	var xmlHttpLocal = initxmlHttpRet();
	if(xmlHttpLocal != null){
		xmlHttpLocal.onreadystatechange = cbFunction;
		
		if(input){
		  // open POST connection
		  xmlHttpLocal.open("POST", url, true);
		} else {
		  // open a GET connection
		  xmlHttpLocal.open("GET", url, true);
		}
		
		// send Ajax call
		xmlHttpLocal.send(input);
		return xmlHttpLocal;
	} else
		return null;
}

/**
 *  Make things a little easier to deal with - will handle checking the state and all and just call the callback on success
 *  Optional errorCB function for if the call doesn't return 200
 */
function niceAjax(url, input, cbFunction, errorCB){
  var req = null;
  
  function handleEvent(e){
    if(req && req.readyState == 4){
      if(req.status == 200){
        cbFunction(req);
      } else if (typeof(errorCB) == 'function') {
        errorCB(req);
      }
    }
  }
  
  req = ajax(url, input, handleEvent);
}
