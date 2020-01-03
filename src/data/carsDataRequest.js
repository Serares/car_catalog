import RequestURL from '../services/requestUrl';

/*
  returns an array of objects
*/
const fetchDataFromApi= function() {
    let carsArray = [];
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", RequestURL.reqUrl() + "/getItems/masini/");
      //response type json so it's automatically JSON.parse();
      xhr.responseType = "json";
      xhr.onerror = function() {
        reject(xhr.statustext);
      };
      xhr.onloadstart = function() {
        // console.log("XHR Started");
      };
      xhr.onload = function() {
        let response = xhr.response;
        // console.log("Datele din xhr", response);
        for (let item in response) {
          carsArray.push({
            ...response[item]
          });
        }
        resolve(carsArray);
      };
      xhr.send();
    });
  }
const fetchDataBrand = function(){
    return "Salut";
}
const getSortedData = function(type, direction){
  let sortingInfo = {type:type, direction:direction};
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", RequestURL.reqUrl() + "/getItems/sortate/");
      //response type json so it's automatically JSON.parse();
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.responseType = "json";
      xhr.onerror = function() {
        reject(xhr.statustext);
      };
      xhr.onload = function() {
        let response = xhr.response;
        // response is an object that has the date Array with sorted objects
        resolve(response.date);
      };
      xhr.send(JSON.stringify(sortingInfo));
    });
}
export {
    fetchDataFromApi,
    fetchDataBrand,
    getSortedData
};