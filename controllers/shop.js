const Product = require('../models/product');
const PRODUCTS_PER_PAGE=3;

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.json(products)
    }
    )
    .catch(err=>{console.log(err)});
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
     res.status(200).json(product);
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  const page=+req.query.page ||1;
  Product.findAndCountAll()
  .then(numProducts =>{
    totalItems=numProducts.count;
    return Product.findAll({offset:((page-1)*PRODUCTS_PER_PAGE),
      limit : PRODUCTS_PER_PAGE})
  })
    .then(products => {
      res.status(200).json({products:products,
        currentPage:page,
        hasPreviosPage: page > 1,
        hasNextPage:PRODUCTS_PER_PAGE *page <totalItems,
        nextPage: page+1,
        previosPage: page-1,
        lastPage:Math.ceil(totalItems/PRODUCTS_PER_PAGE)
      })      
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
    })
    .then((products) =>{
      res.status(200).json(products);
    })
    .catch(err => console.log(err))
    
};

exports.postCart = (req, res, next) => {
  if(!req.body.productId){
    return res.status(201).json({success:false,message:"product id is not given"})
  }
  const prodId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      console.log(cart);
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        return res.status(202).json({success:false,message:"This item is already in the cart"})
      }
      else{
        Product.findByPk(prodId)
        .then(product => {
          return fetchedCart.addProduct(product);
        })
        .then(() => {
        return req.user.getCart()
        })
        .then(cart => {
          return cart.getProducts()
        })
        .then((products) => {
          
              res.status(200).json(products);
        })
        .catch(err=>console.log(err));
      }
    })
    
    .catch(err => console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.status(200).json();
    })
    .catch(err => console.log(err));
};

exports.postOrder=(req,res,next)=>{
  let fetchedCart;
  let fetchedOrder;
  req.user.getCart()
  .then((cart)=>{
    fetchedCart=cart;
    return cart.getProducts();
  })
  .then((products)=>{
    return req.user.createOrder()
    .then(order=>{
      fetchedOrder=order;
      return order.addProducts(products)
    })
  })
  .then(()=>{
    fetchedCart.setProducts(null)
    return res.json({success:true,orderId:fetchedOrder.id});
  })
  .catch(err =>console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
    .then(orders => {
      res.status(200).json(orders);   
    })
    .catch(err => console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
