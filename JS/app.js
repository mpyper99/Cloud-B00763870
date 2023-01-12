//The URIs of the REST endpoint
IUPS = "https://prod-62.northeurope.logic.azure.com:443/workflows/3d9d40c9b1964737a6c149c21f4d210c/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bNBnjZGApEfETtnGwg3tp77a5BXXKlhNww7mIjGr0p4";
RAI = "https://prod-11.northeurope.logic.azure.com:443/workflows/1926f217457e44b894ce4cb0953f17cc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k3nr5VHZqCBaDxtQOBCSfgB44KzO1I8RWc7-YrpJqA0";

BLOB_ACCOUNT = "https://vidshreb00763870.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retVideos").click(function(){

      //Run the get asset list function
      getVideos();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){

  submitData = new FormData();

 //Get form variables and append them to the form data object
 submitData.append('FileName', $('#FileName').val());
 submitData.append('userID', $('#userID').val());
 submitData.append('userName', $('#userName').val());
 submitData.append('Title', $('#Title').val());
 submitData.append('Publisher', $('#Publisher').val());
 submitData.append('Producer', $('#Producer').val());
 submitData.append('Genre', $('#Genre').val());
 submitData.append('Age rating', $('#Age rating').val());
 submitData.append('File', $("#UpFile")[0].files[0]);

 //Post the form data to the endpoint, note the need to set the content type header
 $.ajax({
 url: IUPS,
 data: submitData,
 cache: false,
 enctype: 'multipart/form-data',
 contentType: false,
 processData: false,
 type: 'POST',
 success: function(data){

  }
});
  
 

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos(){

//Replace the current HTML in that div with a loading message
$('#VideoList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
$.getJSON(RAI, function( data ) {
//Create an array to hold all the retrieved assets
var items = [];

//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$.each(data, function(key, val){
  items.push("<hr />");
  items.push("<video src='"+BLOB_ACCOUNT + val["filePath"] +"' width='320' height='240' controls></video><br />")
  items.push("File:"+val["fileName"] + "<br/>");
  items.push("Title:"+val["Title"] + "<br/>");
  items.push("Uploaded by:"+val['Publisher']+ "<br/>" + "(user id: "+val["userID"]+")<br/>");
  items.push("Producer:"+val["Producer"] + "<br/>");
  items.push("Genre:"+val["Genre"] + "<br/>");
  items.push("Age rating:"+val["Age rating"] + "<br/>");
  items.push("<hr />");

});
//Clear the assetlist div
$('#VideoList').empty();
//Append the contents of the items array to the ImageList Div
$( "<ul/>", {
"class": "my-new-list",
html: items.join( "" )
}).appendTo( "#VideoList" );
});

 
}

