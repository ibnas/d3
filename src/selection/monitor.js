d3.selectionPrototype.monitor = function(){

	if(this.monitored)
		return;
	
	this.parentSelection.monitor();
			this.parentSelection.addChangeListner(this);
	for(j = -1; ++j < this.length; ){
		var group = this[j];
		 var obsrv = new MutationObserver(function(records) {
            var nodes = selector.call(group.parentNode, group.parentNode.__data__, 0, 0);
        	for(i = -1; i++ < nodes.length;){
        		if(n = group.indexOf(nodes[i]) == -1){
        			group.splice(i, 0, node[i]);
        			changeListeners.forEach(function(e){
        				e.addGroup(node[i], j, i);
        			});
        		}
        	}
        	group.splice(nodes.length, group.length - nodes.length);
        	for(i = nodes.length; i < group.length;){
        		group.splice(i, 1);
        		changeListeners.forEach(function(e){
        				e.removeGroup(i);
        			});
        	}
        });

        obsrv.observe(group.parentNode, {childList: true, subtree: true});

	}
}

d3.selectionPrototype.selectionChange = function(nodeList){
	var nodes = this.map(function(val){
		return val.parentNode;
	});

	for(i = -1; ++i< nodeList.length;){
		var node = nodeList.item(i);
		if(n = nodes.indexOf(node)){
			this.splice(i, 0, this.splice(n, 1));
		}else{
			this.splice(i, 0, selector.call(node, node.__data__, i, i));
			
		}
	}
	this.splice(nodeList.length, nodeList.length - this.length);
	this.dataFunction();
}

d3.selectionPrototype.addChangeListner(selection){
	this.changeListeners.push(selection);
}

d3.selectionPrototype.addGroup = function(node, i, j){
	var group = selector.call(node, node.__data__, i, j);
	group.parentNode = node;

	this.splice(j, 0, group);
	MutationObserver obsrv = new MutationObserver(function(records){
		var nodes = selector.call(node, node.__data__, i, j);
        	for(i = -1; i++ < nodes.length;){
        		if(n = group.indexOf(nodes[i]) == -1){
        			group.splice(i, 0, node[i]);
        			changeListeners.forEach(function(e){
        				e.addGroup(node[i], j, i);
        			});
        		}
        	}
        	group.splice(nodes.length, group.length - nodes.length);
        	for(i = nodes.length; i < group.length;){
        		group.splice(i, 1);
        		changeListeners.forEach(function(e){
        				e.removeGroup(i);
        			});
        	}
	});

	group.forEach(function(g, k
		changeListeners.forEach(function(e, i){
			e(g, j, k);
		});
		));
	
}

d3.selectionPrototype.removeGroup = function(i){
	this.splice(i, 1);
};

d3.selectionPrototype.changeListeners = [];