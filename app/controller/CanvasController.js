/* 
 * className : CanvasController
 * definition : Canvas Controller Class
 * 			    canvas all logics
 * author : ggoiya@gmail.com
 * 
 * [할일]
 * [디자인적용]
 * 1. MIX 패널 레이아웃
 * 2. 인터랙선 - 믹스버튼을 누르면
 * 
 * [해야할기능]
 * 2.이미지불러오기저장(우선 앱스 함수만 넣어두자)
 * 3.센차파일 앱스로 넣어서 테스트하기
 * 4.폰테스트
 * 4.시작할때 로딩이미지 적용/splash??
 * 5.어플아이콘링크걸기
 * 6.info 이미지로 만들던지-이미지 조합해서 글이랑 섞어서
 * 
 * build패키징 왜안되나..-.-;;png문제같은데..crunch...
 *  
 * [기능개선-다음버전에 해도될일]
 * 1.UNDO/REDO 왜곡에 추가하기
 * 2.패널전환시 애니실행시 레이아웃 달라져서 버그느낌이 살짝있다.
 * 3.사진 프레임이랑 사진이랑 영역이 정확히 잘 안맞는다.

 */
Ext.define('photoR.controller.CanvasController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	distortionPanel : 'distortion filterpanel',
        	filterPanel : 'filter filterpanel',
        		
        	saveBtn : 'toolbar button[action=save]',
            panelBtn : 'toolbar button[action=filterpanel]',

            mixBtn : 'mix button'
        },
        control: {
        	distortionPanel : {
        		FILTER : 'onDistortion'
        	},
        	filterPanel : {
        		FILTER : 'onFilter'
        	},
        	'distortion' : {
        		PHOTO_SELECTION : 'onPhotoSelection'
        	},
        	'mix' : {
        		PHOTO_SELECTION : 'onPhotoSelection',
        		FACE_DETECTION : 'onFaceDetection',
        		MIX : 'onMix'
        	},
        	'filter' : {
        		PHOTO_SELECTION : 'onPhotoSelection'
        	}
        },
        canvas : null,
    	ctx : null,
    	image : null,
        fData : {},//filterName : pixelData
        mData : {},//face(x,y,w,h), hair(x,y,w,h)
        dData : []// pixelData, pixelData, pixelData
    },
    /*
     * [이벤트] - 불러온 사진이 로드가 완료될 때 호출한다.
     */
    onPhotoSelection : function(mode, image){
    	this.setImage(image);
    	this.getDistortionPanel().show();
    	this.getFilterPanel().show();
    	if(mode!='mix') this.getPanelBtn().show();
    	
    	this.initCanvas(mode);
    	this.drawImage();
    	this.initData(mode);
    },
    /*
     * [이벤트] - 왜곡필터를 선택할 때마다 호출된다.
     */
    onDistortion : function(filterName){
    	var input = this.getCtx();
    	var bitmap = input.getImageData(0,0,100,100);
    	var mapper = photoR.lib.DistortionUtil.mapper;
    	    mapper = new mapper(bitmap.width, bitmap.height, 'flower');
    		mapper.setTranslate(filterName);
    	var canvasPoint = this.getCanvasPoint();
    	var locked = false;
    	this.getCanvas().onmousedown = null;
    	this.getCanvas().onmousedown = function(e) {
			if (locked)
				return;
			locked = true;
			var dx = e.clientX- Math.ceil(bitmap.width/2)-canvasPoint.x;
			var dy = e.clientY- Math.ceil(bitmap.height/2)-canvasPoint.y;
			var texture = input.getImageData(dx, dy, bitmap.width, bitmap.height + 1);
				mapper.exec(bitmap, texture);
			input.putImageData(bitmap, dx, dy);
			locked = false;	
		}; 
    },
    /*
     * [이벤트] - 필터를 선택할 때마다 호출된다.
     */
    onFilter : function(filterName){
		if(!this.getFData()[filterName]){
			this.drawImage();
	    	switch(filterName){
				case 'grayscale': 	this.setFilter(filterName); 		 break;
				case 'brightness': 	this.setFilter(filterName, 60); 	 break;
				case 'threshold': 	this.setFilter(filterName, 100); 	 break;
				case 'blur': 
				case 'sharpen': 
				case 'edges': 
				case 'emboss': 		this.setConvoluteFilter(filterName); break;
			} 	
		}
    	this.getCtx().putImageData(this.getFData()[filterName], 0, 0);
    },
    onFaceDetection : function(itemId){
    	var comp = ccv.detect_objects({
	        "canvas": this.getCanvas(),
	        "cascade": cascade,
	        "interval": 1,//5,
	        "min_neighbors": 1
	    });
    	if(comp.length==0){
    		this.getMData()[itemId] = null;
    		Ext.Msg.alert('no detection!!');
    	}else{
    		this.getImage().src = this.getCanvas().toDataURL();
    		comp[0].image = this.getImage();
    		this.getCtx().lineWidth = 3;
        	this.getCtx().strokeStyle = "#f00";
        	for (var i = 0; i < comp.length; i++){
    			this.getCtx().strokeRect(comp[0].x, comp[0].y, comp[0].width, comp[0].height);
    	    }
        	this.getMData()[itemId] = comp[0];
    	}
    	this.checkMixBtn();
		comp = null;
    },
    onMix : function(){
    	var face = this.getMData()['photo0'];
    	var hair = this.getMData()['photo1'];
    	this.getCtx().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
    	this.getCtx().drawImage(hair.image,0,0);
    	this.getCtx().drawImage(face.image, 
				face.x, face.y, face.width, face.height,
				hair.x, hair.y, hair.width, hair.height);
    	face = null;
    	hair = null;
    	
    	this.getApplication().getController('MainController').callSetActiveItem('mixResult');
    	
    },
    checkMixBtn : function(){
    	(this.getMData()['photo0'] && this.getMData()['photo1'])? 
    			this.getMixBtn().enable() : this.getMixBtn().disable();
    },
    onUndo : function(){
    	
    },
    onSave : function(){
    	//var strDataURI = this.getCanvas().toDataURL('image/jpeg'); //기본은 png로 된다.
    },
    /*
     * 사진을 새로 불러올때마다 데이타를 초기화 한다.
     */   
    initData : function(mode){
    	switch(mode){
    		case 'filter': 		this.setFData({});break;
    		case 'distortion': 	this.setDData({});break;
    		//case 'mix': 		this.setMData({});break;
    	};
    },
    /*
     * 모드마다 캔버스가 다르므로 모드가 바뀔때마다 타겟이 될 캔버스를 재설정한다.
     */
    initCanvas : function(mode){
    	this.setCanvas(Ext.getDom(mode.substring(0,1) + 'canvas'));
    	this.setCtx(this.getCanvas().getContext("2d"));	
    	//한번만 정해야된다. 너비값이 달라지면 새로 그리나부다-.-;;
    	var canvasSize = this.getCanvasSize();
    	if(this.getCanvasSize().width != this.getCanvas().width && 
    			this.getCanvasSize().height != this.getCanvas().height){
    		this.getCanvas().width = canvasSize.width;
        	this.getCanvas().height = canvasSize.height;
    	}
    	canvasSize = null;
    },
    /*
     * 타이틀바와 툴바를 제외한 컨텐츠영역 사이즈값을 리턴한다.(css참고)
     */
    getContentSize : function(){
    	var nScreenW = Math.round(Ext.Viewport.getWindowWidth());
    	var nScreenH = Math.round(Ext.Viewport.getWindowHeight());
    	var nPanelW  = nScreenW;
    	var nPanelH  = nScreenH - (60 + 60);//titlebar + toolbar 
    	return{
    		width 	 : nPanelW,
    		height   : nPanelH,
    		paddingX : nPanelW * 0.06,
    		paddingY : nPanelW * 0.06
    	};
    },
    /*
     * 상대적인 캔버스 좌표(css참고)
     */
    getCanvasPoint : function(){
    	var contentSize = this.getContentSize();
    	var nFrameX = contentSize.width * 0.1;
    	var nFrameY = contentSize.height * 0.3;
    	var nX = Math.round(nFrameX + contentSize.paddingX);
    	var nY = Math.round(nFrameY + contentSize.paddingY + 60);
    	contentSize = null;
    	return{
    		x : nX,
    		y : nY
    	};
    },
    /*
     * 상대적인 캔버스 사이즈(css참고)
     */
    getCanvasSize : function(){
    	var contentSize = this.getContentSize();
    	var nFrameW = contentSize.width * 0.8;
    	var nFrameH = contentSize.height * 0.8;
    	var nW = Math.round(nFrameW - (contentSize.paddingX * 2));
    	var nH = Math.round((nFrameH - (contentSize.paddingY * 2)) * 0.8);
    	contentSize = null;
    	return{
    		width : nW,
    		height : nH
    	};
    },
    /*
     * 불러온 사진을 캔버스 크기로 그려준다.
     */
    drawImage : function(){
    	this.getCtx().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);
		this.getCtx().drawImage(this.getImage(), 
				0, 0, this.getImage().width, this.getImage().height,
				0, 0, this.getCanvas().width, this.getCanvas().height);
    },
    /*
     * 현재 캔버스 픽셀정보를 리턴한다.
     */
    getPixel : function(){
    	return this.getCtx().getImageData(0, 0, this.getCanvas().width, this.getCanvas().height);
    },
    /*
     * 필터정보를 세팅하고 한번 세팅한 픽셀 정보는 저장한다.
     */
    setFilter : function(filterName, value){
		this.getFData()[filterName] = photoR.lib.FilterUtil.filterImage(
				filterName, 
				this.getPixel(), 
				value);
	},
	setConvoluteFilter : function(filterName){
		var d = photoR.lib.FilterUtil.kernelData[filterName];
		this.getFData()[filterName] = photoR.lib.FilterUtil.filterImage(
				'convolute', 
				this.getPixel(),
				this.getPixel(), //tmpPixels
				d.kernel, d.factor, d.bias);
		d = null;
	}
});