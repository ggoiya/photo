/* 
 * className : Mix
 * definition : 
 * author : ggoiya@gmail.com
 * create : 2012.08.25
 */
Ext.define('photoR.view.Mix', {
	extend : 'Ext.Panel',
	xtype: 'mix',
	requires : [
	    'Ext.Img'          
	],
	config : {
		layout : 'fit',
		cls : 'back',
		items : [
			{
				xtype : 'panel',
				layout : 'hbox',
				cls : 'photoFrame-small-group',
				items : [
				    {
						xtype : 'img', 
						itemId : 'photo0', 
						cls :'photoFrame-small',
						style:'background-image:url(resources/images/frame_select_photo.png);'	
					},
					{
						xtype:'panel',
						layout:'vbox',
						width:'10%',
						items:[
						    {
						    	 xtype:'spacer',
						    	 flex:1
						    },
							{
								 xtype:'img',
								 cls : 'mixPlus',
								 flex:1
							}, 
							{
						    	 xtype:'spacer',
						    	 flex:1 
						    }
						]
					},
					{
						xtype : 'img', 
						itemId : 'photo1', 
						cls :'photoFrame-small',
						style:'background-image:url(resources/images/frame_select_hair.png);'
					}
				]
			 },
			 {
				   xtype: 'button',
				   action : 'mix',
				   baseCls : 'mixBtn2',
				   disabledCls: 'mixBtn2-disabled',
				   disabled : true
			 },
			 {
		    	 xtype : 'filterpanel'//,//기본으로 제공되는 헤어스타일  - 대머리.. 
//		    	 data : [
//		     		  {
//		                  name: 'grayscale',
//		                  url: 'resources/images/filter/grayscale.png'
//		              }
//		           ],
//		         tpl : '<tpl for="."><img style="width:60px;height:60px;" src="{url}"></img></tpl>'
		     }
		],
		listeners : [
             {
            	 fn: 'onLoadImage',
                 delegate: 'img',
            	 event: 'load',
                 element : 'element'
             },
             {
            	 fn: 'onTapButton',
                 delegate: 'button[action=mix]',
            	 event: 'tap',
                 element : 'element'
             }
		],
		filterImg:null
	},
	onLoadImage : function(image, event){
    	this.fireEvent('PHOTO_SELECTION', this.xtype, event.target);
    	this.fireEvent('FACE_DETECTION', image.config.itemId);
    },
    onTapButton : function(button, event){
    	this.fireEvent('MIX');
    }
});