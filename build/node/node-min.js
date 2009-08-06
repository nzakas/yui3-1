YUI.add("node-base",function(E){var N={},K={},I=Array.prototype.slice,H=".",F="nodeName",L="nodeType",B="ownerDocument",J="tagName",D="_yuid",G=function(P){var O=P[D];if(O&&N[O]&&N[O]!==P){P[D]=null;}this.addAttrs(G.ATTRS);this._initPlugins();O=E.stamp(P);if(!O){O=E.guid();}this[D]=O;N[O]=P;G._instances[O]=this;},M=function(P){var O=null;if(P){O=(typeof P==="string")?function(Q){return E.Selector.test(Q,P);}:function(Q){return P(G.get(Q));};}return O;};G.NAME="Node";G.re_aria=/^(?:role$|aria-)/;G.DOM_EVENTS={abort:true,beforeunload:true,blur:true,change:true,click:true,close:true,command:true,contextmenu:true,drag:true,dragstart:true,dragenter:true,dragover:true,dragleave:true,dragend:true,drop:true,dblclick:true,error:true,focus:true,keydown:true,keypress:true,keyup:true,load:true,mousedown:true,mousemove:true,mouseout:true,mouseover:true,mouseup:true,mousemultiwheel:true,mousewheel:true,submit:true,mouseenter:true,mouseleave:true,scroll:true,reset:true,resize:true,select:true,textInput:true,unload:true};E.mix(G.DOM_EVENTS,E.Env.evt.plugins);G._instances={};G.plug=function(){var O=I.call(arguments,0);O.unshift(G);E.Plugin.Host.plug.apply(E.Base,O);return G;};G.unplug=function(){var O=I.call(arguments,0);O.unshift(G);E.Plugin.Host.unplug.apply(E.Base,O);return G;};G.getDOMNode=function(O){if(O){if(O instanceof G){O=N[O[D]];}else{if(!O[F]||E.DOM.isWindow(O)){O=null;}}}return O||null;};G.scrubVal=function(R,P,Q){if(P&&R){if(typeof R==="object"||typeof R==="function"){if(L in R||E.DOM.isWindow(R)){R=G.get(R);}else{if(R.item||(R[0]&&R[0][L])){R=E.all(R);}else{Q=(Q===undefined)?4:Q;if(Q>0){for(var O in R){if(R.hasOwnProperty&&R.hasOwnProperty(O)){R[O]=G.scrubVal(R[O],P,--Q);}}}}}}}else{if(R===undefined){R=P;}}return R;};G.addMethod=function(O,Q,P){if(O&&Q&&typeof Q==="function"){G.prototype[O]=function(){P=P||this;var S=I.call(arguments),R;if(S[0]&&S[0] instanceof G){S[0]=G.getDOMNode(S[0]);}if(S[1]&&S[1] instanceof G){S[1]=G.getDOMNode(S[1]);}S.unshift(N[this[D]]);R=G.scrubVal(Q.apply(P,S),this);return R;};}else{}};G.importMethod=function(Q,O,P){if(typeof O==="string"){P=P||O;G.addMethod(P,Q[O],Q);}else{E.each(O,function(R){G.importMethod(Q,R);});}};G.get=function(R,S){var O=null,Q,P;if(R){if(typeof R==="string"){if(R.indexOf("doc")===0){R=E.config.doc;}else{if(R.indexOf("win")===0){R=E.config.win;}else{R=E.Selector.query(R,S,true);}}if(!R){return null;}}else{if(R instanceof G){return R;}}P=R._yuid;Q=N[P];O=G._instances[P];if(!O||(Q&&R!==Q)){O=new G(R);}}return O;};G.create=function(){return G.get(E.DOM.create.apply(E.DOM,arguments));};G.ATTRS={text:{getter:function(){return E.DOM.getText(N[this[D]]);},setter:function(O){E.DOM.setText(N[this[D]],O);return O;}},"options":{getter:function(){return this.getElementsByTagName("option");}},"children":{getter:function(){var R=N[this[D]],Q=R.children,S,P,O;if(!Q){S=R.childNodes;Q=[];for(P=0,O=S.length;P<O;++P){if(S[P][J]){Q[Q.length]=S[P];}}}return E.all(Q);}},value:{getter:function(){return E.DOM.getValue(N[this[D]]);},setter:function(O){E.DOM.setValue(N[this[D]],O);return O;}}};G.DEFAULT_SETTER=function(O,Q){var P=N[this[D]],R;if(O.indexOf(H)>-1){R=O;O=O.split(H);E.Object.setValue(P,O,Q);}else{if(P[O]!==undefined){P[O]=Q;}}return Q;};G.DEFAULT_GETTER=function(O){var P=N[this[D]],Q;if(O.indexOf&&O.indexOf(H)>-1){Q=E.Object.getValue(P,O.split(H));}else{Q=P[O];}return Q?E.Node.scrubVal(Q,this):Q;};E.augment(G,E.Event.Target);E.augment(G,E.Plugin.Host);E.mix(G.prototype,{_getClasses:function(){return[G];},toString:function(){var Q="",P=this[D]+": not bound to a node",O=N[this[D]];if(O){Q+=O[F];if(O.id){Q+="#"+O.id;}if(O.className){Q+="."+O.className.replace(" ",".");}Q+=" "+this[D];}return Q||P;},addAttrs:function(O){this._attrs=this._attrs||{};E.each(O,function(Q,P){this._attrs[P]=Q;},this);},get:function(O){var P=this._attrs[O],Q;if(P&&P.getter){Q=P.getter.call(this);}else{if(G.re_aria.test(O)){Q=E.Node.getDOMNode(this).getAttribute(O,2);}else{Q=G.DEFAULT_GETTER.apply(this,arguments);}}return Q;},set:function(O,Q){var P=this._attrs[O];if(P&&P.setter){P.setter.call(this,Q);}else{if(G.re_aria.test(O)){E.Node.getDOMNode(this).setAttribute(O,Q);}else{G.DEFAULT_SETTER.apply(this,arguments);}}return this;},create:G.create,compareTo:function(O){var P=N[this[D]];if(O instanceof E.Node){O=E.Node.getDOMNode(O);}return P===O;},inDoc:function(P){var O=N[this[D]];P=(P)?G.getDOMNode(P):O[B];if(P.documentElement){return E.DOM.contains(P.documentElement,O);}},getById:function(Q){var P=N[this[D]],O=E.DOM.byId(Q,P[B]);if(O&&E.DOM.contains(P,O)){O=E.get(O);}else{O=null;}return O;},ancestor:function(O){return G.get(E.DOM.elementByAxis(N[this[D]],"parentNode",M(O)));},previous:function(P,O){return G.get(E.DOM.elementByAxis(N[this[D]],"previousSibling",M(P),O));},next:function(Q,P,O){return G.get(E.DOM.elementByAxis(N[this[D]],"nextSibling",M(P),O));},query:function(O){return E.get(E.Selector.query(O,N[this[D]],true));},queryAll:function(O){return E.all(E.Selector.query(O,N[this[D]]));},test:function(O){return E.Selector.test(N[this[D]],O);},remove:function(){var O=N[this[D]];O.parentNode.removeChild(O);return this;},invoke:function(V,P,O,U,T,S){var R=N[this[D]],Q;if(P&&P instanceof E.Node){P=G.getDOMNode(P);}if(O&&O instanceof E.Node){O=G.getDOMNode(O);}Q=R[V](P,O,U,T,S);return E.Node.scrubVal(Q,this);},destructor:function(){},each:function(P,O){O=O||this;return P.call(O,this);},item:function(O){return this;},size:function(){return N[this[D]]?1:0;},insert:function(P,O){if(P){if(typeof O==="number"){O=N[this[D]].childNodes[O];}if(typeof P!=="string"){P=E.Node.getDOMNode(P);}E.DOM.addHTML(N[this[D]],P,O);}return this;},prepend:function(O){return this.insert(O,0);},append:function(O){return this.insert(O,null);},setContent:function(O){E.DOM.addHTML(N[this[D]],O,"replace");return this;},hasMethod:function(P){var O=N[this[D]];return(O&&(typeof O==="function"));}},true);E.Node=G;E.get=E.Node.get;E.Array._diff=function(P,O){var T=[],V=false,R,Q,U,S;outer:for(R=0,U=P.length;R<U;
R++){V=false;for(Q=0,S=O.length;Q<S;Q++){if(P[R]===O[Q]){V=true;continue outer;}}if(!V){T[T.length]=P[R];}}return T;};E.Array.diff=function(P,O){return{added:E.Array._diff(O,P),removed:E.Array._diff(P,O)};};var A=function(P){var O=P.nodes||[],Q=P.doc||E.config.doc;if(typeof O==="string"){this._query=O;O=E.Selector.query(O,Q);}E.stamp(this);A._instances[this[D]]=this;K[this[D]]=O;};A.NAME="NodeList";A.getDOMNodes=function(O){return K[O[D]];};A._instances=[];A.each=function(O,R,Q){var P=K[O[D]];if(P&&P.length){E.Array.each(P,R,Q||O);}else{}};A.addMethod=function(O,R,Q){var P=A._getTempNode();if(O&&R){A.prototype[O]=function(){var T=[],S=arguments;E.Array.each(K[this[D]],function(Y){var X="_yuid",V=E.Node._instances[Y[X]],W,U;if(!V){N[P[X]]=Y;V=P;}W=Q||V;U=R.apply(W,S);if(U!==undefined&&U!==V){T[T.length]=U;}});return T.length?T:this;};}else{}};A.importMethod=function(Q,O,P){if(typeof O==="string"){P=P||O;A.addMethod(O,Q[O]);}else{E.each(O,function(R){A.importMethod(Q,R);});}};A._getTempNode=function(){var O=A._tempNode;if(!O){O=E.Node.create("<div></div>");A._tempNode=O;}return O;};E.mix(A.prototype,{item:function(O){return E.get((K[this[D]]||[])[O]);},each:function(Q,P){var O=this;E.Array.each(K[this[D]],function(S,R){S=E.get(S);return Q.call(P||S,S,R,O);});return O;},batch:function(Q,P){var R=this,O=A._getTempNode();E.Array.each(K[this[D]],function(U,T){var S=E.Node._instances[U[D]];if(!S){N[O[D]]=U;S=O;}return Q.call(P||S,S,T,R);});return R;},some:function(Q,P){var O=this;return E.Array.some(K[this[D]],function(S,R){S=E.get(S);P=P||S;return Q.call(P,S,R,O);});},indexOf:function(O){return E.Array.indexOf(K[this[D]],E.Node.getDOMNode(O));},filter:function(O){return E.all(E.Selector.filter(K[this[D]],O));},modulus:function(Q,P){P=P||0;var O=[];A.each(this,function(S,R){if(R%Q===P){O.push(S);}});return E.all(O);},odd:function(){return this.modulus(2,1);},even:function(){return this.modulus(2);},destructor:function(){delete A._instances[this[D]];},refresh:function(){var P,O,Q=K[this[D]];if(this._query){if(K[this[D]]&&K[this[D]][0]&&K[this[D]][0].ownerDocument){P=K[this[D]][0].ownerDocument;}K[this[D]]=E.Selector.query(this._query,P||E.config.doc);O=E.Array.diff(Q,K[this[D]]);O.added=O.added?E.all(O.added):null;O.removed=O.removed?E.all(O.removed):null;this.fire("refresh",O);}return this;},on:function(Q,P,O){O=O||this;this.batch(function(R){R.on.call(R,Q,P,O);});},after:function(Q,P,O){O=O||this;this.batch(function(R){R.after.call(R,Q,P,O);});},size:function(){return K[this[D]].length;},get:function(P){var O=[],Q=A._getTempNode();A.each(this,function(S){var R=E.Node._instances[S[D]];if(!R){N[Q[D]]=S;R=Q;}O[O.length]=R.get(P);});return O;},toString:function(){var R="",Q=this[D]+": not bound to any nodes",O=K[this[D]],P;if(O&&O[0]){P=O[0];R+=P[F];if(P.id){R+="#"+P.id;}if(P.className){R+="."+P.className.replace(" ",".");}if(O.length>1){R+="...["+O.length+" items]";}}return R||Q;}},true);A.importMethod(E.Node.prototype,["append","detach","detachAll","insert","plug","prepend","remove","set","setContent","unplug"]);E.NodeList=A;E.all=function(P,R,O){var Q=new A({nodes:P,doc:R});return Q;};E.Node.all=E.all;E.Array.each(["replaceChild","appendChild","insertBefore","removeChild","hasChildNodes","cloneNode","hasAttribute","removeAttribute","scrollIntoView","getElementsByTagName","focus","blur","submit","reset","select"],function(O){E.Node.prototype[O]=function(S,Q,P){var R=this.invoke(O,S,Q,P);return R;};});G.importMethod(E.DOM,["contains","setAttribute","getAttribute"]);if(!document.documentElement.hasAttribute){E.Node.prototype.hasAttribute=function(O){return E.DOM.getAttribute(E.Node.getDOMNode(this),O)!=="";};}E.NodeList.importMethod(E.Node.prototype,["getAttribute","setAttribute"]);(function(P){var O=["hasClass","addClass","removeClass","replaceClass","toggleClass"];P.Node.importMethod(P.DOM,O);P.NodeList.importMethod(P.Node.prototype,O);})(E);E.Node.prototype.delegate=function(T,S,O,R){R=R||this;var Q=Array.prototype.slice.call(arguments,4),P=["delegate",S,E.Node.getDOMNode(this),T,O,R];P=P.concat(Q);return E.on.apply(E,P);};var C=function(S){var Q=E.Node._instances[S.relatedNode._yuid],P,O,R;console.log(S,Q);if(Q&&Q._yuievt&&Q._yuievt.events[P]){P=S.type.substring(3);O={};for(R in S){if(S[R].nodeType){O[R]=E.get(S[R]);}else{O[R]=S[R];}}O.type=P;Q.fire(P,O);}};E.config.doc.addEventListener("DOMAttrModified",C,0);E.config.doc.addEventListener("DOMNodeInserted",C,0);E.config.doc.addEventListener("DOMNodeRemoved",C,0);},"@VERSION@",{requires:["dom-base","base","selector"]});YUI.add("node-style",function(A){(function(C){var B=["getStyle","getComputedStyle","setStyle","setStyles"];C.Node.importMethod(C.DOM,B);C.NodeList.importMethod(C.Node.prototype,B);})(A);},"@VERSION@",{requires:["dom-style","node-base"]});YUI.add("node-screen",function(A){A.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(B){A.Node.ATTRS[B]={getter:function(){var C=Array.prototype.slice.call(arguments);C.unshift(A.Node.getDOMNode(this));return A.DOM[B].apply(this,C);}};});A.Node.ATTRS.scrollLeft={getter:function(){var B=A.Node.getDOMNode(this);return("scrollLeft" in B)?B.scrollLeft:A.DOM.docScrollX(B);},setter:function(C){var B=A.Node.getDOMNode(this);if(B){if("scrollLeft" in B){B.scrollLeft=C;}else{if(B.document||B.nodeType===9){A.DOM._getWin(B).scrollTo(C,A.DOM.docScrollY(B));}}}else{}}};A.Node.ATTRS.scrollTop={getter:function(){var B=A.Node.getDOMNode(this);return("scrollTop" in B)?B.scrollTop:A.DOM.docScrollY(B);},setter:function(C){var B=A.Node.getDOMNode(this);if(B){if("scrollTop" in B){B.scrollTop=C;}else{if(B.document||B.nodeType===9){A.DOM._getWin(B).scrollTo(A.DOM.docScrollX(B),C);}}}else{}}};A.Node.importMethod(A.DOM,["getXY","setXY","getX","setX","getY","setY"]);A.Node.ATTRS.region={getter:function(){var B=A.Node.getDOMNode(this);if(B&&!B.tagName){if(B.nodeType===9){B=B.documentElement;}else{if(B.alert){B=B.document.documentElement;}}}return A.DOM.region(B);}};A.Node.ATTRS.viewportRegion={getter:function(){return A.DOM.viewportRegion(A.Node.getDOMNode(this));
}};A.Node.importMethod(A.DOM,"inViewportRegion");A.Node.prototype.intersect=function(B,D){var C=A.Node.getDOMNode(this);if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.intersect(C,B,D);};A.Node.prototype.inRegion=function(B,D,E){var C=A.Node.getDOMNode(this);if(B instanceof A.Node){B=A.Node.getDOMNode(B);}return A.DOM.inRegion(C,B,D,E);};},"@VERSION@",{requires:["dom-screen"]});YUI.add("node",function(A){},"@VERSION@",{use:["node-base","node-style","node-screen"],skinnable:false,requires:["dom"]});