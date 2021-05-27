const div1=dom.create("<div>把这段话插到after-test后面</div>")
const table=dom.create("<table><tr><td>12</td></tr></table>")
const td=dom.create("<td>1111</td>")
const div2=dom.create("<div>把这段话插到before-test前面</div>")
const div3=dom.create("<div id='firstChild'>222</div>")
const div4=dom.create("<div id='parent' style='color:blue'>我是dom插入的父亲，我的儿子是parentTest</div>")

// console.log(div)
// console.log(table)
console.log(div3)

dom.after(after,div1)
dom.before(before,div2)
dom.append(childTest,div3)
dom.wrap(parentTest,div4)    

const nodes=dom.empty(window.empty)
console.log(nodes)
dom.attr(modifyTest,'title','hi,I am winter') // 设置节点属性
const title=dom.attr(modifyTest,'title')// 读取属性值
console.log(`modifyTest:${title}`)
dom.text(text,"这是读写的内容")
dom.text(text)
dom.style(text,{border:'1px solid red',color:'yellow'})
dom.style(text,'color','red')
dom.style(text,'padding','12px')
dom.style(text,{border:'1px solid black'})
dom.style(text,{background:'pink'})
dom.class.add(test,'red')
dom.class.add(test,'blue')
dom.class.remove(test,'blue')
console.log(dom.class.has(test,'blue'))
console.log(dom.class.has(test,'red'))
const fn=()=>{
    alert('点击了')
}
dom.on(click,'click',fn)
dom.on(off,'click',fn)
dom.off(off,'click',fn)
const t=dom.find('#find1')[0]
console.log(dom.find('.f',t)[0])

console.log(dom.parent(t))

const x=dom.find('#s2')[0]
console.log(dom.siblings(x))
console.log(dom.next(x))
console.log(dom.previous(x))

const t1=dom.find('#travel')[0]
dom.each(dom.children(t1),(n)=>dom.style(n,'color','red'))

console.log(dom.index(s2))

const div=dom.find('#test>.red')[0]
// console.log(div)
dom.style(div,'color','white')
 const divList=dom.find(".red")

 dom.each(divList,(n)=>console.log(n))