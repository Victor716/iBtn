var curMeta = document.querySelector('meta[name="renderer"]');
if (curMeta) {
	curMeta.setAttribute("content", "webkit");
} else {
	var meta = document.createElement('meta');
	meta.name = "renderer";
	meta.content = "webkit";
	document.head.prepend(meta);
}


(function() {
	//Constructor
	var iBtn = function(dom) {
		if (dom) {
			this.dom = dom;
			iBtn.prototype.init(this.dom);
		} else {
			alert("请输入dom节点！");
		}
	}
	
	iBtn.VERSION = 1.0;
	iBtn.TEMPLATE = "<i class='fa fa-spinner fa-spin hide'></i>" + 
					"<span class='btn-content'></span>";				
	iBtn.COLOR = "#00a8fe";
	iBtn.COTENT = "iBtn";
	iBtn.SCALE = 2.5;
	iBtn.FONT = 'arial';
	iBtn.FONT_SIZE = 14;
	iBtn.ONCLICK = function(e, fn, dom) {
		console.log("click");
		var idom = dom.childNodes[0];
		dom.classList.add("shade");
		dom.setAttribute('disabled', "disabled");
		idom.classList.remove("hide");
		if (fn) fn(dom);	
	}
	
	iBtn.ONRES = function(e, dom) {
		console.log("response");
		var idom = dom.childNodes[0];
		idom.classList.add("hide"); 
		dom.classList.remove("shade");
		dom.removeAttribute('disabled'); 
	}
	
	iBtn.init = function(selector) {
		selector = selector || '.ibtn';
		try{
			var iBtnInstances = {};
			var pdoms = document.querySelectorAll(selector);
			for(var i = 0; i < pdoms.length; i++) {
				if (!pdoms[i].id) {
					pdoms[i].id = "ibtn-" + i;
				}
				iBtnInstances[pdoms[i].id] = new iBtn(pdoms[i]);
			}
			return iBtnInstances;
		}catch(e){
			console.log(e);
		}
	}
	
	iBtn.prototype = {
		init: function(dom) {
			dom = dom || this.dom;
			dom.innerHTML = iBtn.TEMPLATE;
			var idom = dom.childNodes[0],
				sdom = dom.childNodes[1];
			var color = dom.getAttribute('color'),
			    width = dom.getAttribute('width'),
			    height = dom.getAttribute('height'),
			    content = dom.getAttribute('content');
			if (width !== null) {
				dom.style.setProperty('--btn-width', width + 'px');
				dom.style.setProperty('--btn-height', width / iBtn.SCALE + 'px');
			} else if (height !== null) {
				dom.style.setProperty('--btn-height', height + 'px');
				dom.style.setProperty('--btn-width', height * iBtn.SCALE + 'px');
			}
			if (color !== null) dom.style.setProperty('--btn-color', color);
			sdom.innerHTML = content !== null ? content : dom.id;
		},
		bindApi: function(fn, dom) {
			dom = dom || this.dom;
			dom.clickEv = new Event('click');
			dom.responseEv = new Event('onres');
			if(dom.addEventListener) {
				dom.addEventListener('click', function(e) {
					iBtn.ONCLICK(e, fn, dom);
				});
				dom.addEventListener('onres', function(e) {
					console.log("onres");
					iBtn.ONRES(e, dom);
				});
			} else {
				dom.attachEvent('click', function(e) {
					iBtn.ONCLICK(e, fn, dom);
				});
				dom.attachEvent('onres', function(e) {
					iBtn.ONRES(e, dom);
				});
			}
		},
		unbindApi: function(fn, dom) {
			dom = dom || this.dom;
			dom.clickEv = null;
			dom.responseEv = null;
			if(dom.removeEventListener) {
				dom.removeEventListener('click', function() {
					iBtn.ONCLICK(event, fn);
				});
			} else {
				dom.detachEvent('click', function() {
					iBtn.ONCLICK(event, fn);
				});
			}
		}
	}
	
	window['iBtn'] = iBtn; //在window对象中注册一个iBtn
	
})()

