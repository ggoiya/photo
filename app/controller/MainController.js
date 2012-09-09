/* 
 * className : MainController
 * definition : Main Controller Class
 * author : ggoiya@gmail.com
 */
Ext.define('photoR.controller.MainController', {
    extend: 'Ext.app.Controller',
    requires : [
            'Ext.device.Device',
            'Ext.device.Camera'    
    ],
    config: {
        refs: {
        	main : 'main',
        	
        	titlebar : 'titlebar',
        	toolbar : 'toolbar',
        	
        	info:'info',
        	
        	modeselection : 'modeselection',
        	
        	distortion : 'distortion',
        	distortionImg0 : 'distortion img[itemId=photo0]',
        	distortionPanel : 'distortion filterpanel',
        	
        	mix : 'mix',
        	mixResult : 'mixResult',
        	mixImg0 : 'mix img[itemId=photo0]',
        	mixImg1 : 'mix img[itemId=photo1]',
        	mixPanel : 'mix filterpanel', 
        	
        	filter : 'filter',
        	filterImg0 : 'filter img[itemId=photo0]',
        	filterPanel : 'filter filterpanel', 
        	
        	cameraBtn : 'toolbar button[action=camera]',
        	albumBtn : 'toolbar button[action=album]',
        	saveBtn : 'toolbar button[action=save]',
        	panelBtn : 'toolbar button[action=filterpanel]'
        },
        control: {
        	'titlebar button' : {
            	tap : 'onTapButton'
            },
            'toolbar button' : {
            	tap : 'onTapButton'
            },
            'info button' :{
            	tap : 'onTapButton'
            },
            'modeselection button' : {
            	tap : 'onTapButton'
            },
            'mix img' : {
            	tap : 'onTapMixImage'
            }
        },
        mode : 'Modeselection',
        imgNo : 0
    },
    onTapButton: function(button, e) {
        var action = button.config.action;
        switch(action){
	        case 'camera':
	        	//TEST START
	        	var img = this.getRefElement('Img'+this.getImgNo());
	    			img.setSrc('resources/images/photo02.jpg');
	        	break;
	        	//TEST END
	        case 'album': 
	        	this.callNativeApiCamera(action, 'file');
	        	break;
	        case 'modeselection':
	        	this.getTitlebar().hide();
	    		this.getToolbar().hide();
	    		this.callSetActiveItem(action);
	    		break;
	        case 'distortion': 
	        case 'mix': 
	        case 'filter':
	        	this.getTitlebar().show();
	    		this.getToolbar().show();
	    		this.getCameraBtn().show();
	        	this.getAlbumBtn().show();
	        	this.callSetActiveItem(action);
	        	break;
	        case 'filterpanel' : this.getRefElement('Panel').isHidden()? 
	        		this.getRefElement('Panel').show() : this.getRefElement('Panel').hide();break;
	        case 'save' : 
	        	Ext.Msg.confirm('Save', 'do you want save?', this.onSave);
	        	break;
        }
        (action=="info")? this.getInfo().show() : this.getInfo().hide();
    },
    onSave : function(buttonId){
    	if(buttonId=='yes'){
    		console.log('SAVE : YES');
    	}else{
    		console.log('SAVE : NO');
    	}	
    },
    onTapMixImage : function(image, e) {
    	this.setImgNo(image.config.itemId.substr(5));
        this.checkMixCls();
    },
    checkMixCls:function(){
    	if(this.getMode()!='Mix') return;
    	this.getMixImg0().removeCls('filterFrame-photo-on');
        this.getMixImg1().removeCls('filterFrame-photo-on');
        var img = this.getRefElement('Img'+this.getImgNo());
        	img.addCls('filterFrame-photo-on');
    },
    callSetActiveItem : function(action){
    	this.setMode(this.getRefName(action));
    	this.getMain().setActiveItem(this.getRefElement(''));
    	this.getTitlebar().setTitle(this.getMode());
    	this.checkItemEnable(action);
    	this.setImgNo(0);
    	this.checkMixCls();
    },
    callNativeApiCamera : function(source, destination){
    	var img = this.getRefElement('Img'+this.getImgNo());
    		img.setSrc('resources/images/ohana.jpg');
//        Ext.device.Camera.capture({
//            success: function(image) {
//            	image = 'resources/images/photo01.jpg';
//            	img.setSrc(image);
//            },
//            quality: 75,
//            source : source,
//            destination: destination
//        });
        img=null;
    },
    getRefName : function(refName){
    	return refName.substr(0,1).toUpperCase()  + refName.substring(1,refName.length);
    },
    getRefElement : function(suffix){
    	return this['get'+this.getMode()+suffix]();
    },
    checkItemEnable : function(action){
    	if(action=='modeselection'){
    		return;
    	}

    	if(action=='mix'){
    		this.getRefElement('Panel').hide();
    		this.getPanelBtn().hide();
    		return;
    	}
    	if(action=='mixResult'){
    		this.getPanelBtn().hide();
    		this.getCameraBtn().hide();
        	this.getAlbumBtn().hide();
        	return;
    	}

    	this.getApplication().getController('CanvasController').initCanvas(this.getRefElement('').xtype);
    	if(this.getRefElement('Img0').getSrc()){
    		this.getRefElement('Panel').show();
    		this.getPanelBtn().show();
    	}else{
    		this.getRefElement('Panel').hide();
    		this.getPanelBtn().hide();
    	}
    }
});