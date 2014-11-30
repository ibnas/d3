d3.selectionPrototype.monitor = function() {

    if (this.monitored)
        return;
    this.changeListeners = [];
    if (this.parentSelection) {
        this.parentSelection.monitor();
        this.parentSelection.addChangeListner(this);

    }
    for (j = -1; ++j < this.length; ) {
        var group = this[j];
        var obsrv = new MutationObserver(function(records) {
            var nodes = selector.call(group.parentNode, group.parentNode.__data__, 0, 0);
            for (i = -1; i++ < nodes.length; ) {
                if (n = group.indexOf(nodes[i]) == -1) {
                    group.splice(i, 0, node[i]);
                    changeListeners.forEach(function(e) {
                        e.addGroup(node[i], j, i);
                    });
                }
            }
            group.splice(nodes.length, group.length - nodes.length);
            for (i = nodes.length; i < group.length; ) {
                group.splice(i, 1);
                changeListeners.forEach(function(e) {
                    e.removeGroup(i);
                });
            }
        });

        obsrv.observe(group.parentNode, {childList: true, subtree: true});

    }
}

d3_selectionPrototype.addChangeListner = function(selection) {
    this.changeListeners.push(selection);
}

d3_selectionPrototype.addGroup = function(node, i, j) {
    var group = selector.call(node, node.__data__, i, j);
    group.parentNode = node;

    this.splice(j, 0, group);
    var obsrv = new MutationObserver(function(records) {
        var nodes = selector.call(node, node.__data__, i, j);
        for (i = -1; i++ < nodes.length; ) {
            if (n = group.indexOf(nodes[i]) == -1) {
                group.splice(i, 0, node[i]);
                changeListeners.forEach(function(e) {
                    e.addGroup(node[i], j, i);
                });
            }
        }
        group.splice(nodes.length, group.length - nodes.length);
        for (i = nodes.length; i < group.length; ) {
            group.splice(i, 1);
            changeListeners.forEach(function(e) {
                e.removeGroup(i);
            });
        }
    });
    obsrv.observe(node, {childList: true, subtree: true});
    group.forEach(function(g, k) {
        changeListeners.forEach(function(e, i) {
            e(g, j, k);
        });
    });

}

d3_selectionPrototype.removeGroup = function(i) {
    this.splice(i, 1);
};


