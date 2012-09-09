/* 
 * className : Main
 * definition : Main View Class
 * author : ggoiya@gmail.com
 * create : 2012.08.25
 */
Ext.define("photoR.view.Main", {
    extend: 'Ext.Panel',
    xtype : 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
    	layout: 'card',
        items: [
           {
        	   xtype : 'titlebar',
        	   cls:'titlebar',
        	   docked: 'top',
        	   hidden : true,
        	   title : 'Modeselection',
        	   items: [ 
    	            { 
    	            	xtype: 'button',
    	            	baseCls:'homeBtn',
    	            	width:46,//css에 값이 있어도 여기에 안 넣어주면 크기가 안먹는다.
    	            	action: 'modeselection'
    	            },
    	            {
						xtype : 'button', 
						baseCls:'infoBtn',
						action : 'info',
						align : 'right'
         	        }
        	   ]
           },
           {
        	   xtype : 'toolbar',
        	   id:'toolbar',
        	   docked: 'bottom',
        	   scrollable:
        	   {
       		     	direction: 'horizontal',
       		     	directionLock: true
        	   },
        	   hidden : true,
        	   items: [
         	        {
						xtype : 'button',
						baseCls:'cameraBtn',
						pressedCls:'cameraBtn-pressed',
						action : 'camera'
         	        }, 
         	        {
						xtype : 'button', 
						baseCls:'albumBtn',
						pressedCls:'albumBtn-pressed',
						action : 'album'
         	        },        	        
         	        {
						xtype : 'button',
						baseCls:'saveBtn',
						pressedCls:'saveBtn-pressed',
						action : 'save'
         	        },
         	        {
						xtype : 'button',
						baseCls:'filterBtn',
						pressedCls:'filterBtn-pressed',
						action : 'filterpanel',
						hidden : true
         	        },
               ]    
           },
           {
        	   xtype : 'info'
           },
//           {
//        	   xtype : 'intro'
//           },
           {
        	   xtype : 'modeselection'
           }, 
           {
        	   xtype : 'distortion'
           }, 
           {
        	   xtype : 'mix'
           },
           {
        	   xtype : 'mixResult'
           },
           {
        	   xtype : 'filter'
           }
        ]
    }
});
