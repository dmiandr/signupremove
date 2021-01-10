let sitesconf = [
{site: "vk.com", modify: [
	{locatetagby: "class", makrname: "UnauthActionBoxContainer", action: "remove"}, 
	{locatetagby: "class", makrname: "new_header_design", action: "clearstyle"}, 
	{locatetagby: "id", makrname: "box_layer_bg", action: "remove"},
	{locatetagby: "id", makrname: "box_layer_wrap", action: "remove"}]},
{site: "instagram.com", modify: [
	{locatetagby: "body", makrname: "", action: "clearstyle"}, 
	{locatetagby: "class", makrname: "RnEpo  _Yhr4    ", action: "remove"}]},
{site: "facebook.com", modify: [
	{locatetagby: "id", makrname: "u_0_1t", action: "remove"}]}	
];

var config = { attributes: false, childList: true, subtree: true }; // Конфигурация MutationObserver
var mutationCallback = function(reclst, obs) {
var curl = document.URL;

sitesconf.forEach(function(elem)
{
    if(curl.includes(elem.site) == true)
    {
        var mods = elem.modify;
        mods.forEach(function(mod)
        {
	    var locby = mod.locatetagby;
	    var nam = mod.makrname;
	    var act = mod.action;
	    if(locby == "class")
	    {
	      var e = getSingleElementOfClass(nam);
	    }
	    if(locby == "id")
	    {
	      var e = getSingleElementOfId(nam);
	    }
	    if(locby == "body")
	    {
	      var e = document.body;
	    }
	    
	    
	    if(e != undefined)
	    {
	      console.log("E = " + e);	      
	      
	      if(act == "remove")
	      {
		var p = e.parentNode;
		p.removeChild(e);
	      }
	      if(act == "clearstyle")
	      {
		e.removeAttribute("style");	      
	      }		
	    }	    
        })
    }
})
}

let observer = new MutationObserver(mutationCallback);
observer.observe(document.body, config);

function getSingleElementOfClass(clname)
{
  var elems = document.getElementsByClassName(clname);
  if(elems.length == 1)
    {
      var itm = elems.item(0);
      return itm;      
    }
}

function getSingleElementOfId(id)
{
  var elem = document.getElementById(id);
  if(elem != null)
    {
      return elem;
    }
}
