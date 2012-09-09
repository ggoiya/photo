/* 
 * className : Distortion
 * definition : 
 * author : ggoiya@gmail.com
 * create : 2012.08.25
 */
Ext.define("photoR.view.Distortion", {
    extend: 'Ext.Panel',
    xtype : 'distortion',
    requires : [
        'Ext.Img'          
    ],
    config: {
    	layout : 'fit',
    	cls : 'back-result',
    	items : [
			{
				 xtype : 'panel',
				 cls : 'photoFrame',
				 html : '<canvas id="dcanvas"></canvas>'
			},
		    {
		    	 xtype : 'img', 
		    	 itemId : 'photo0',
		    	 hidden : true
		    },
		    {
		    	 xtype : 'filterpanel',
		    	 data : [
		     		  {
		                  name: 'spherize',
		                  url: 'resources/images/panel/distort/spherize.png'
		              }, 
		              { 
		                  name: 'twirl',
		                  url: 'resources/images/panel/distort/twirl.png'
		              },
		              {       
		                  name: 'zoom',
		                  url: 'resources/images/panel/distort/zoom.png'
		              },
		              {
		                  name: 'reflect',
		                  url: 'resources/images/panel/distort/reflect.png'
		              }, 
		              { 
		                  name: 'pyramid',
		                  url: 'resources/images/panel/distort/pyramid.png'
		              },
		              {       
		                  name: 'flower',
		                  url: 'resources/images/panel/distort/flower.png'
		              }
		           ],
		         tpl : '<tpl for="."><div class="filterFrame"><img name="{name}" class="filterFrame-photo" src="{url}"></img></div></tpl>'
		    }
		],
		listeners : [
            {
            	fn: 'onLoadImage',
                delegate: 'img[itemId=photo0]',
            	event: 'load',
                element : 'element'
            }
		],
		filterImg:null
    },
    onLoadImage : function(image, event){
    	this.fireEvent('PHOTO_SELECTION', this.xtype, event.target);
    }
});
