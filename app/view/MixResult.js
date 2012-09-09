/* 
 * className : MixResult
 * definition : 
 * author : ggoiya@gmail.com
 * create : 2012.09.09
 */
Ext.define('photoR.view.MixResult', {
	extend : 'Ext.Panel',
	xtype: 'mixResult',
	config : {
		layout : 'fit',
		cls : 'back-result',
		items : [
			{
				xtype : 'panel',
				cls : 'photoFrame',
				html : '<canvas id="mcanvas"></canvas>'
			}
		]
	}
});