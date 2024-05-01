let sitesconf = [
{site: "vk.com", modify: [
	{locatetagby: "class", makrname: "UnauthActionBoxContainer", action: "remove"}, 
	{locatetagby: "class", makrname: "new_header_design", action: "clearstyle"}, 
    {locatetagby: "body", makrname: "", action: "setstyle", style: "overflow: scroll;"}, 
	{locatetagby: "id", makrname: "box_layer_bg", action: "remove"},
	{locatetagby: "id", makrname: "box_layer_wrap", action: "remove"}]},
{site: "instagram.com", modify: [
	{locatetagby: "body", makrname: "", action: "clearstyle"}, 
	{locatetagby: "class", makrname: "RnEpo  _Yhr4    ", action: "remove"}]},
{site: "facebook.com", modify: [
	{locatetagby: "custom", makrname: "See more on Facebook", action: "remove"},
	{locatetagby: "custom", makrname: "Please log in to see this page", action: "remove"}]}
];

var config = { attributes: false, childList: true, subtree: true }; // Конфигурация MutationObserver
var mutationCallback = function(reclst, obs) {
    var curl = document.URL;
    
    sitesconf.forEach(function(elem)
    {
        if(curl.includes(elem.site) == true)
        {
            let mods = elem.modify;
            mods.forEach(function(mod)
            {
                let e = undefined
                let styletoset = mod.style;
                let locby = mod.locatetagby;
                let nam = mod.makrname;
                let act = mod.action;
                if(locby == "class") {
                    e = getSingleElementOfClass(nam);
                }
                if(locby == "id") {
                    e = getSingleElementOfId(nam);
                }
                if(locby == "body") {
                    e = document.body;
                }
                if(locby == "custom") {
                    let xcondit = "//*[contains(text(), '"
                    xcondit += nam
                    xcondit += "')]"                    
                    let blockelems = document.evaluate(xcondit, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                    if(blockelems.snapshotLength == 0)
                        return;
                    
                    arre = []
                    for( let co = 0; co < blockelems.snapshotLength; co++) {
                        let node = blockelems.snapshotItem(co)
                        if(node.nodeType != 1)
                            continue;
                        let cure = getIndependentParent(node, 8)
                        if(!arre.includes(cure))
                            arre.push(cure)
                    }
                    if(arre.length == 1)
                        e = arre[0]
                }
                if(e != undefined)
                {
                    console.log("E = " + e);
                    
                    if(act == "remove") {
                        let p = e.parentNode;
                        p.removeChild(e);
                    }
                    if(act == "clearstyle") {
                        e.removeAttribute("style")
                    }
                    if(act == "setstyle") {
                        e.style = styletoset
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
    let elems = document.getElementsByClassName(clname);
    if(elems.length == 1) {
        let itm = elems.item(0)
        return itm;
    }
}

function getSingleElementOfId(id)
{
    let elem = document.getElementById(id)
    if(elem != null) {
        return elem;
    }
}

/*! 
 * getNodeDepth is a recurcive function that calculates the distance betwen the current node and is's most distant leave. If node is leave itself, distance set to 1
 */
function getNodeDepth(node) {
    if(!node.hasChildNodes)
        return 1;
    
    let echildren = node.childNodes
    let maxdepth = 0
    for (const cnode of echildren) {
        curd = getNodeDepth(cnode)
        if(maxdepth < curd)
            maxdepth = curd
    }
    return maxdepth+1;
}

function getIndependentParent(node, maxdist) {
    if(node == document)
        return node;
    
    let itsibs = [...node.parentElement.children].filter(child => child !== node);
    let curdepth = 0
    for (const e of itsibs) {
        let d = getNodeDepth(e)
        if( d > curdepth)
            curdepth = d
    }
    if(curdepth > maxdist)
        return node;
    
    return getIndependentParent(node.parentElement, maxdist);
}
