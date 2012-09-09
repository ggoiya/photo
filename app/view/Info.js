/* 
 * className : Intro
 * definition : 
 * author : ggoiya@gmail.com
 * create : 2012.09.07
 */
Ext.define("photoR.view.Info", {
    extend: 'Ext.Panel',
    xtype : 'info',
    id : 'info',
    config: {
    	layout : 'fit',
    	modal:true,
    	centered:true,
    	hidden:true,
    	items:[
	       {
	    	   data : [
	     		  {
	                  name: '[Photo revolution]',
	                  descripton: '얼굴인식,왜곡, 합성을 이용하여 재미있는 사진을 만드는 어플입니다'
	              }, 
	              { 
	                  name: '[기본 사용법]',
	                  descripton: [
	                         '모드를 선택합니다.(distortion, mix, funny camera)<br>',
	                         '카메라, 앨범을 통해 사진을 선택합니다.' 
	                  ].join('')
	              },
	              {       
	                  name: '[Distortion]',
	                  descripton: [
			                 '필터를 선택하고 사진에서 왜곡하고싶은 부분을 터치합니다.' 
			          ].join('')
	              },
	              {
	                  name: '[Mix]',
	                  descripton: [
			                 '선택할 사진 타입을 선택합니다(얼굴, 헤어)<br>',
			                 '사진을 선택하면 자동으로 얼굴인식 여부를 체크해줍니다.<br>',
			                 '얼굴인식이 안되는 사진일 경우 다시 선택해주세요.<br>',
			                 '사진이 제대로 준비되면 mix버튼이 활성화 됩니다.<br>',
			                 'mix버튼을 누르면, 합성된 이미지를 볼 수 있습니다.'
			          ].join('')
	              }, 
	              { 
	                  name: '[Funny camera]',
	                  descripton: [
			                 '필터를 선택하면 필터가 적용된 사진을 확인할 수 있습니다.' 
			          ].join('')
	              }
	           ],
			   tpl : '<p><br><font color=#000><ul><tpl for="."><li><b><font color=#CB1B9B>{name}</b></font><p>{descripton}</li></tpl></ul></font>',
	       	   styleHtmlContent:true,
	       	   scrollable:true
	       },
	       {
    	    	  xtype:'button',
    	    	  action:'infoclose',
    	    	  top : 10,
    	    	  right : 10,
    	    	  baseCls:'closeBtn'     
	       },
    	]
    }
});
  