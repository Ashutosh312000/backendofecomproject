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

    
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "DELETE";
        article.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', (e) => {
    

          

            axios.post(`http://localhost:4000/admin/delete-product`, { productId: myarr[i].id })
                .then((response) => {
                    if (response.status == 200) {
                        e.target.parentElement.remove()
                    }
                    else {
                        throw new Error('Product is NOT deleted')
                    }
                })
                .catch(err => console.log(err));
        })







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

















    