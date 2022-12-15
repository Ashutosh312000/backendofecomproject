

const cartBtn=document.getElementById('cartBtn');
const cart=document.getElementById('cart');
const total_price=document.getElementById('totalprice');
const closebtn=document.getElementsByClassName('cancel');
const purchaseBtn=document.getElementsByClassName('purchase-btn')[0];

closebtn[0].addEventListener('click',()=>{
    cart.style.display='none'
})

cartBtn.addEventListener('click',()=>{
    cart.style.display='inline-block';
    cart.style.background="#6e86da";   
})


purchaseBtn.addEventListener('click',()=>{
    const cart_row=document.getElementsByClassName('cart-row');
    if(cart_row.length!=0){
    
    axios.post('http://localhost:4000/purchase')
    .then(response=>{
        alert(`Order sucessfully placed with order id = ${response.data.orderId}`)
    
        for (var i = cart_row.length - 1; i >= 0; --i) {
            cart_row[i].remove();
          }
          total_price.textContent="0";

    })
    .catch(err=>console.log(err))

   
}
})




window.addEventListener('DOMContentLoaded',()=>{

    axios.get('http://localhost:4000/cart')
    .then((response)=>{
        if(response.status===200){
        for(let i=0;i<response.data.length;i++){
            let myobj=response.data[i];
        const albumid=myobj.id;
        const albumname=myobj.title;
        const price=myobj.price;
        const img=myobj.imageUrl;
        const intprice=parseFloat(price); 
        const totalprice=document.getElementById('totalprice');

        const initialprice=parseFloat(totalprice.outerText);
        const actualprice=(intprice+initialprice).toFixed(2);
        totalprice.textContent=`${actualprice}`;  

        const cart_items=document.getElementsByClassName('cartitems')[0];
        let newdiv=document.createElement('div');
        newdiv.classList.add('cart-row')
        cart_items.appendChild(newdiv);
 
        let cart_item=document.createElement('span');
        cart_item.classList.add('cart-item')
        newdiv.appendChild(cart_item);
 
        let cart_img=document.createElement('img');
        cart_img.setAttribute('src',`${img}`);
        cart_img.className="cart-img";
        let cart_albumname=document.createElement('span');
        cart_albumname.className="cart-albumname"
        cart_albumname.textContent=albumname;
 
        cart_item.appendChild(cart_img);
        cart_item.appendChild(cart_albumname);
        
        
 
 
        let cart_price=document.createElement('span');
        cart_price.classList.add('cart-price')
        newdiv.appendChild(cart_price);

        let doller=document.createElement('span');
        doller.id="doller"
        doller.textContent='$';
        cart_price.appendChild(doller);

        let cart_productprice=document.createElement('span');
        cart_productprice.className="cart-productprice"
        cart_productprice.textContent=price;
        cart_price.appendChild(cart_productprice);
 
 
         let cart_quantity=document.createElement('span');
        cart_quantity.classList.add('cart-quantity')
        newdiv.appendChild(cart_quantity);
 
        let input_quantity=document.createElement('input');  
        input_quantity.className="input-quantity";
        input_quantity.setAttribute('type','text');
        input_quantity.setAttribute('value','1');
 
        let remove_btn=document.createElement('button');
        remove_btn.className="remove-btn";
        remove_btn.textContent='REMOVE';
 
        cart_quantity.appendChild(input_quantity);
        cart_quantity.appendChild(remove_btn);
 
 
        remove_btn.addEventListener('click',(e)=>{
            let remove_price=parseFloat(e.target.parentElement.previousElementSibling.children[1].textContent);
           
            let old_price=parseFloat(total_price.textContent);
           

             new_price=parseInt(old_price-remove_price).toFixed(2);
            total_price.textContent = `${new_price}`;
            
          
            e.target.parentElement.parentElement.remove();

             axios.post('http://localhost:4000/cart-delete-item',{productId:albumid})
             .then((response)=>{
                if(response.status!=200){
                    throw new Error("There is error in deleting the item from the cart");
                }
             })
 
        }) 
        }
    }
    else{
        throw new Error("There is error in getting items for the cart");
    }
    })

})



