window.addEventListener('DOMContentLoaded', () => {

    axios.get(`http://localhost:4000/`)
        .then((response) => {
            goto(response);

        })
        .catch(err => console.log(err));



})

goto = (response) => {
    let data = response.data;
    
    const body = document.getElementById('body');
    const storeSection = document.createElement('div');
    storeSection.id = "storeSection";
    body.appendChild(storeSection);

    const pagination = document.createElement('div');
    pagination.id = "pagination";
    body.appendChild(pagination);



    let myarr = response.data.products;
    for (let i = 0; i < myarr.length; i++) {
        const article = document.createElement('article');
        article.className = "card product-item";
        storeSection.appendChild(article);

        const articleheader = document.createElement('header');
        articleheader.className = "card__header";
        article.appendChild(articleheader);

        const articleheaderh1 = document.createElement('h1');
        articleheaderh1.textContent = `${myarr[i].title}`;
        articleheader.appendChild(articleheaderh1);
        const cardimage = document.createElement('div')
        cardimage.className = "card__image";
        article.appendChild(cardimage);


        const img = document.createElement('img');
        img.setAttribute('src', myarr[i].imageUrl);
        img.setAttribute('alt', myarr[i].title);
        cardimage.appendChild(img);

        const cardcontent = document.createElement('div')
        cardcontent.className = "card__content";
        article.appendChild(cardcontent);

        let doller = document.createElement('span');
        doller.id = "doller"
        doller.textContent = '$';
        cardcontent.appendChild(doller);

        const cardcontenth2 = document.createElement('span');
        cardcontenth2.className = "product__price";
        cardcontent.appendChild(cardcontenth2);
        cardcontenth2.textContent = `${myarr[i].price}`; //yhan per price dalo

        const cardcontentp = document.createElement('p');
        cardcontentp.className = "product__description";
        cardcontent.appendChild(cardcontentp);
        cardcontentp.textContent = `${myarr[i].description}`; //yhan per description ayega    


        const cardactions = document.createElement('div')
        cardactions.className = "card__actions";
        article.appendChild(cardactions);

        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = "addToCartBtn";
        addToCartBtn.id = `${myarr[i].id}`;
        addToCartBtn.textContent = "ADD TO CART";
        article.appendChild(addToCartBtn);
        addToCartBtn.addEventListener('click', (e) => {

            axios.post(`http://localhost:4000/cart`, { productId: myarr[i].id })
                .then((response) => {
                    if (response.status == 200) {
                        e.target.textContent = "ADDED";
                        addtocart(e);
                    }
                    else if (response.status == 202) {
                        alert(`${response.data.message}`);
                        e.target.textContent = "ADDED";
                    }
                    else {
                        throw new Error('Product is NOT Added')
                    }
                })
                .catch(err => console.log(err));
        })







        // const deleteBtn = document.createElement('button');
        // deleteBtn.className = "deleteBtn";
        // deleteBtn.textContent = "DELETE";
        // article.appendChild(deleteBtn);
        // deleteBtn.addEventListener('click', (e) => {
    

          

        //     axios.post(`http://localhost:4000/admin/delete-product`, { productId: myarr[i].id })
        //         .then((response) => {
        //             if (response.status == 200) {
        //                 e.target.parentElement.remove()
        //             }
        //             else {
        //                 throw new Error('Product is NOT deleted')
        //             }
        //         })
        //         .catch(err => console.log(err));
        // })







    }





    if (data.hasPreviosPage) {
        const previosBtn = document.createElement('button');
        previosBtn.className = "pageBtn";
        previosBtn.textContent = `${data.previosPage}`;
        pagination.appendChild(previosBtn);
        previosBtn.addEventListener('click', () => {
            gotopage(data.previosPage);
        });
    }


    const presentBtn = document.createElement('button');
    presentBtn.className = "pageBtn";
    presentBtn.id = "presentBtn"
    presentBtn.textContent = `${data.currentPage}`;
    presentBtn.setAttribute('type', 'active');
    pagination.appendChild(presentBtn);





    if (data.hasNextPage) {
        const nextBtn = document.createElement('button');
        nextBtn.className = "pageBtn";
        nextBtn.textContent = `${data.nextPage}`;
        pagination.appendChild(nextBtn);
        nextBtn.addEventListener('click', () => {
            gotopage(data.nextPage);
        });
    }

    if (data.hasNextPage && data.currentPage < data.lastPage - 1) {
        const lastBtn = document.createElement('button');
        lastBtn.className = "pageBtn";
        lastBtn.textContent = `...${data.lastPage}`;
        pagination.appendChild(lastBtn);
        lastBtn.addEventListener('click', () => {
            gotopage(data.lastPage);
        });

    }


    gotopage = (pagenumber) => {
        axios.get(`http://localhost:4000/?page=${pagenumber}`)
            .then((response) => {
                storeSection.remove();
                pagination.remove();
                goto(response)
            })

    }

}



function addtocart(e) {
    if (e.target.classList.contains('addToCartBtn')) {
        const albumid = e.target.id;
        const albumname = e.target.parentElement.parentElement.children[0].children[0].outerText;
        const price = e.target.parentElement.children[2].children[1].outerText;
        const img = e.target.parentElement.children[1].firstElementChild.src;
        const intprice = parseFloat(price);
        const totalprice = document.getElementById('totalprice');
        
    

       
                    const initialprice=parseFloat(totalprice.outerText);
                    const actualprice=(intprice+initialprice).toFixed(2);
                    totalprice.textContent=`${actualprice}`;       

                    const cart_items = document.getElementsByClassName('cartitems')[0];
                    let newdiv = document.createElement('div');
                    newdiv.classList.add('cart-row')
                    cart_items.appendChild(newdiv);

                    let cart_item = document.createElement('span');
                    cart_item.classList.add('cart-item')
                    newdiv.appendChild(cart_item);

                    let cart_img = document.createElement('img');
                    cart_img.setAttribute('src', `${img}`);
                    cart_img.className = "cart-img";
                    let cart_albumname = document.createElement('span');
                    cart_albumname.className = "cart-albumname"
                    cart_albumname.textContent = albumname;

                    cart_item.appendChild(cart_img);
                    cart_item.appendChild(cart_albumname);





                    let cart_price = document.createElement('span');
                    cart_price.classList.add('cart-price')
                    newdiv.appendChild(cart_price);
                    let doller = document.createElement('span');
                    doller.id = "doller"
                    doller.textContent = '$';
                    cart_price.appendChild(doller);


                    let cart_productprice = document.createElement('span');
                    cart_productprice.className = "cart-productprice"
                    cart_productprice.textContent = price;
                    cart_price.appendChild(cart_productprice);


                    let cart_quantity = document.createElement('span');
                    cart_quantity.classList.add('cart-quantity')
                    newdiv.appendChild(cart_quantity);

                    let input_quantity = document.createElement('input');
                    input_quantity.className = "input-quantity";
                    input_quantity.setAttribute('type', 'text');
                    input_quantity.setAttribute('value', '1');

                    let remove_btn = document.createElement('button');
                    remove_btn.className = "remove-btn";
                    remove_btn.textContent = 'REMOVE';

                    cart_quantity.appendChild(input_quantity);
                    cart_quantity.appendChild(remove_btn);


                    remove_btn.addEventListener('click', (e) => {
                        let remove_price=parseFloat(e.target.parentElement.previousElementSibling.children[1].textContent);
           
                        let old_price=parseFloat(total_price.textContent);
           
                         new_price=parseInt(old_price-remove_price).toFixed(2);
                        total_price.textContent = `${new_price}`;
                      
                        e.target.parentElement.parentElement.remove();

                        axios.post('http://localhost:4000/cart-delete-item', { productId: albumid })
                            .then((response) => {
                                if (response.status != 200) {
                                    throw new Error("There is error in deleting the item from the cart");
                                }
                            })

                    })
                }
            }













    