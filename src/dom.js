window.dom={
    //显示一个元素，  const div=dom.create("div")
    //  create(tagName){
    //     // return document.createElement(tagName);
    // }

    //可以写成这样const div=dom.create("<div><span>1</span></div>")
    // create(string){
    //     const container=document.createElement("div");
    //     container.innerHTML=string;
    //     return container.children[0];
    // }

    //div不能显示td,要搭配table一起用;template可以显示td,用来容纳任意元素
    // 用template不能用children来获取
    create(string){
        // 创建节点
        const container=document.createElement("template");
        container.innerHTML=string.trim();//trim去掉字符串两边的空格
        return container.content.firstChild;
    },
    after(node,node2){
        // node2插到node的后面，在node节点后面需新增node2节点
       // console.log(node.nextSibling)//没有下一个节点业适用，如果元素紧跟后面没有节点则返回 null
        node.parentNode.insertBefore(node2,node.nextSibling)//把node2插到node紧跟的节点的前面，即插到node的后面
    //  node.parentNode.insertBefore(node2,node)//node2插到node前面
    },
    before(node,node2){
       // node2插到node的前面,node和node2是兄弟关系
       node.parentNode.insertBefore(node2,node)
    },
    append(parent,node){
        // 加子元素、后代
        parent.appendChild(node)
    },
    wrap(node,parent){
        dom.before(node,parent)//先兄弟关系
        dom.append(parent,node)//再变成父子关系
    },
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    empty(node){
        // 删除所有子节点
        //不能用for循环，每次length会变，用while循坏
        const {childNodes}=node//const childNodes=node.childNodes的简写
        const array=[]
        let x=node.firstChild
        while(x){
            array.push(dom.remove(node.firstChild))
            x=node.firstChild
        }
        return array
    },
    attr(node,name,value){
        // 重载，根据参数的个数写相应代码
        if(arguments.length===3){
            // 设置节点属性
          node.setAttribute(name,value)
        }else if(arguments.length===2){
            // 读取属性值
           return node.getAttribute(name) 
        }
    },
    text(node,string){//适配，兼容IE和其他浏览器
        // 读写内容,里面的标签也会改了
        console.log('innerText' in node)
        if(arguments.length===2){
            //改写内容
            if('innerText' in node){
                node.innerText=string//ie
            }else{
                node.textContent=string//firefox、Chrome
            }
        }else if(arguments.length===1){
            //读取内容
            if('innerText' in node){
               return node.innerText
            }else{
               return node.textContent
            }
        }  
    },
    html(node,string){
        if(arguments.length===2){
            node.innerHTML=string
        }else if(arguments.length===1){
           return node.innerHTML
        }
    },
    style(node,name,value){
        if(arguments.length===3){
            //dom.style(div,'color','red')，修改某个属性的样式,或添加样式
            node.style[name]=value
        }else if(arguments.length===2){
            if(typeof name==='string')
            {
                //dom.style(div,'color'),查询属性的样式
                return node.style[name]
            }else if(name instanceof Object){
                //dom.style(div,{color:'red'}),第二个属性为对象，则为添加或修改节点的样式
                const object=name
                for(let key in object){
                    node.style[key]=object[key]
                }
            }
        }

    },
    class:{
        add(node,className){
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)//查询是否有该类
        }
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector,scope){
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n!=node)
    },
    next(node){
        let x=node.nextSibling
        while(x && x.nodeType===3){// 搜nodeType MDN，3代表文本
            x=x.nextSibling
        }
        return x
    },
    previous(node){
        let x=node.previousSibling
        while(x && x.nodeType===3){// 搜nodeType MDN，3代表文本
            x=x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
      let i 
      const list =dom.children(node.parentNode)  
      for(i=0;i<list.length;i++){
          if(list[i]===node){
              break;
          }
      }
      return i
    }
};