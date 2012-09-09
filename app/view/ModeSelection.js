/* 
 * className : ModeSelection
 * definition : 
 * author : ggoiya@gmail.com
 * create : 2012.08.25
 */
Ext.define('photoR.view.ModeSelection', {
	extend : 'Ext.Panel',
	xtype : 'modeselection',
	id:'modeselection',
	config : {
		layout : 'fit',
		items: [
			{
				xtype : 'panel',
				layout: 'vbox',
				cls : 'modeBtnGroup',
				items: [
					{
					    xtype: 'button', 
					    baseCls: 'distortionBtn',
					    pressedCls:'distortionBtn-pressed',
					    action: 'distortion',
					    flex:1
					},
					{
					    xtype: 'button', 
					    action: 'mix', 
					    baseCls: 'mixBtn',
					    pressedCls:'mixBtn-pressed',
					    flex:1
					},
					{
					    xtype: 'button', 
					    action: 'filter', 
					    baseCls: 'funnycameraBtn',
					    pressedCls:'funnycameraBtn-pressed' ,
					    flex:1
					}			        
				]
			}           
        ]
	}
});
