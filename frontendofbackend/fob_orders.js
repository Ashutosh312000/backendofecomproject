const body=document.getElementById('body');



window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:4000/orders')
    .then(response=>{
        console.log(response.data)

        const order_section=document.createElement('section')
        order_section.id="order-section";
        body.appendChild(order_section);

        if(response.data.length<=0){
            no_order_page=document.createElement('h1');
            no_order_page.textContent="NO ORDERS YET";
            body.appendChild(no_order_page);
        }

        else{
            const orderdiv=document.createElement('div');
            orderdiv.id="orderdiv";
            order_section.appendChild(orderdiv);

            for(let k=0;k<response.data.length;k++){
                let myorder=response.data[k];
                const eachorder=document.createElement('div');
                eachorder.className="eachorderdiv";
                orderdiv.appendChild(eachorder);

                const orderidh3=document.createElement('h3');
                orderidh3.textContent=`ORDER NO. ${myorder.id}`
                eachorder.appendChild(orderidh3);

                const productdiv=document.createElement('div');
                productdiv.className="productdiv";
                eachorder.appendChild(productdiv);

                for(let j=0;j<myorder.products.length;j++){

                    const eachproductdiv=document.createElement('div');
                    eachproductdiv.className="eachproductdiv";
                    productdiv.appendChild(eachproductdiv)

                    const producttitle=myorder.products[j].title;
                    const productprice=myorder.products[j].price;
                    const productdescription=myorder.products[j].description;
                    const productimageUrl=myorder.products[j].imageUrl;
                    
                    const producttitleh4=document.createElement('h4');
                    producttitleh4.textContent=`TITLE :${producttitle}`;
                    eachproductdiv.appendChild(producttitleh4);

                    const productpriceh4=document.createElement('h4');
                    productpriceh4.textContent=`PRICE :${productprice}`;
                    eachproductdiv.appendChild(productpriceh4);

                }

                const totalprice=document.createElement('h3');
                totalprice.className="totalprice";
                


            }
        }
    })
})