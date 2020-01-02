import RequestURL from '../services/requestUrl';

// let carsDataObject = {}
let masiniObject;
// let brandsObject;

masiniObject = fetch(RequestURL.reqUrl()+'/getItems/masini/')
.then(res=>{
    return res.json();
})
.then(data=>{
    console.log("Store: ", data);
    return {...data};
})
.catch(err=>{
    console.log(err);
    return err;
});

export default masiniObject;
/*
let xhr = new XMLHttpRequest;
xhr.open('GET', RequestURL.reqUrl()+'/getItems/masini/');
xhr.send();
xhr.onloadstart = function(){
    console.log("XHR Started")
}
xhr.onload = function(){
    let response = xhr.response;
    console.log(response);
}
*/
