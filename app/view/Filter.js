/* 
 * className : Distortion
 * definition : 
 * author : ggoiya@gmail.com
 * create : 2012.08.31
 */
Ext.define("photoR.view.Filter", {
    extend: 'Ext.Panel',
    xtype : 'filter',
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
				 html : '<canvas id="fcanvas"></canvas>'
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
		                  name: 'grayscale',
		                  url: 'resources/images/panel/filter/grayscale.png'
		              }, 
		              { 
		                  name: 'brightness',
		                  url: 'resources/images/panel/filter/brightness.png'
		              },
		              {       
		                  name: 'threshold',
		                  url: 'resources/images/panel/filter/threshold.png'
		              },
		              {
		                  name: 'blur',
		                  url: 'resources/images/panel/filter/blur.png'
		              }, 
		              { 
		                  name: 'sharpen',
		                  url: 'resources/images/panel/filter/sharpen.png'
		              },
		              {       
		                  name: 'edges',
		                  url: 'resources/images/panel/filter/edges.png'
		              },
		              {
		                  name: 'emboss',
		                  url: 'resources/images/panel/filter/emboss.png'
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
