/* 
 * className : FilterPanel
 * definition : 
 * author : ggoiya@gmail.com
 * create : 2012.08.25
 */
Ext.define('photoR.view.FilterPanel', {
	extend : 'Ext.Panel',
	xtype: 'filterpanel',	
	config : {
		layout : 'vbox',
		hidden : true,
		cls:'filterBar',
		scrollable:
		{
		     direction: 'vertical',
		     directionLock: true
		},
		listeners : [
             {
            	 fn: 'onTapImage',
                 delegate: 'img',
            	 event: 'tap',
                 element : 'element'
             }          
		],	
	},
	onTapImage : function(event){
		var parent = this.getParent();
		if(parent.getFilterImg()){
			parent.getFilterImg().removeCls('filterFrame-photo-on');
    	}
    	var el = Ext.get(event.target);
    		el.addCls('filterFrame-photo-on');
    		parent.setFilterImg(el);
    		el=null;
    		parent=null;
		this.fireEvent('FILTER', event.target.name);
		
	}
});