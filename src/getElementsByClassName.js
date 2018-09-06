// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:



var getAllBodyNodes = function(node) { //uses childNodes
	var children = node.childNodes;
	var nodeList = [];

	children.forEach(function(child) {
		nodeList.push(child);
		if (child.childNodes.length > 0) {
			for (var i = 0; i < child.childNodes.length; i++) {
				nodeList.push(child.childNodes[i])
				nodeList = nodeList.concat(getAllBodyNodes(child.childNodes[i]));
			}
		}
		else {
			return [];
		}
	});


	return nodeList;
}


// var getAllBodyNodes = function(node) { //uses children
// 	var descendants = node.children;
// 	var nodeList = [];

// 	for (var childIdx = 0; childIdx < descendants.length; childIdx++) {
// 		nodeList.push(descendants[childIdx]);
// 		if (descendants[childIdx].children.length > 0) {
// 			for (var i = 0; i < descendants[childIdx].children.length; i++) {
// 				nodeList.push(descendants[childIdx].children[i])
// 				nodeList = nodeList.concat(getAllBodyNodes(descendants[childIdx].children[i]));
// 			}
// 		}
// 	}


// 	return nodeList;
// }


var getElementsByClassName = function(className) {
  var body = [document.body];
  var nodeList = body.concat(getAllBodyNodes(document.body));
  var HTMLCollection = [];

  nodeList.forEach(function(elem, idx) {
  	var classArr = elem.classList;
  	if (classArr) {
  		for (var i = 0; i < classArr.length; i++) {
  			if (classArr[i] === className) {
  				HTMLCollection.push(elem);
  			}
  		}
  	}

  });
  return HTMLCollection;
};
