import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import{ getAllProduct ,AddProductFrigo, }from "../FunctionComponents/FrigoFunction" ;
import { Form, Button, Container } from "react-bootstrap";
import { Box } from "@chakra-ui/core";
// import { RenderingContext } from "../../Auth-function/Auth";
import ThemeContext from "../LayoutsComponents/ThemeContext";
export default function ModelAddProduct() {

  const { render, setRendering } = useContext(ThemeContext) ;
  const [allProduct, setProduct] = useState([]) 
  const [data, setData] = useState({}) 

  useEffect(  () => {
    getAllProduct().then(response => {
      console.log(response.data.success);
      setProduct(response.data.success)
    }).catch((error) => {
      console.log('error ' + error);
    });
  },[]);


  const handelChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value })
    console.log(data);
  }


  const DataProductFrigo =
  {
    productId: data.product,
    quantity: data.quantity,
    frigoId: localStorage.frigoId,
    type: data.type
  }
  const SubAdd = async (e) => { 
    e.preventDefault(); 
// const selectedIndex = target.options.selectedIndex
//  var key = target.options[selectedIndex].getAttribute('data-key');
//  localStorage.setItem("productId", key ); 
 console.log(  DataProductFrigo  ) 
 AddProductFrigo(DataProductFrigo).then((res) => {
  setRendering (!render)
 console.log(res);  
 }).catch((err) => {
         console.log(err + " 😱 error");
     }) }
    
    return (
      <Container> 
  
      <Form onSubmit={(e) => SubAdd(e)} action=''>
          <Form.Group  controlId="product" >
              <Form.Label>Produit </Form.Label>
              <Form.Control as="select"    onChange={handelChange}>
                  <option hidden value= 'choose...'   >Choose...</option>
                  {allProduct.map((product) => 
                      <option key={product.id} value={product.id}  >{product.name}</option>
                  )}
              </Form.Control>
          </Form.Group>

          <Form.Group controlId="quantity">
              <Form.Label >Quantité</Form.Label>
              <Form.Control type="txt" placeholder="" onChange={handelChange} />
          </Form.Group>

       <Form.Group controlId="type">
              <Form.Label> Type de quantité </Form.Label>
              <Form.Control as="select" onChange={handelChange}>
              <option hidden value= 'choose...'   >Choose...</option>

                  <option >(U)nité </option>
                  <option >(L)itre </option>
                  <option > (G)ramme</option>
              </Form.Control>
          </Form.Group>  
          <Form.Group  className = 'd-flex justify-content-center' >
                      <Button variant="success" className='add' type="submit">
                        Ajouter
                       </Button>
        </Form.Group>
      </Form>
    </Container>
  
    // <>
    //   <a href="#" className="uk-button uk-button-primary uk-margin-top" data-toggle="modal" data-target="#staticBackdrop1" style={{ backgroundColor: 'rgb(83, 177, 12)', color: ' #f8f9fa' }} >
    //     Ajouter un Produit
    //      </a>
    //   {/* model element to add product  */}
    //   <div className="modal fade" id="staticBackdrop1" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    //     <div className="modal-dialog" role="document">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h5 className="modal-title" id="staticBackdropLabel" style={{ color: 'black' }}> Ajouter un produit au frigo </h5>

    //           <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    //             <span aria-hidden="true">&times;</span>
    //           </button>
    //         </div>
    //         <div className="modal-body">

    //           <form onSubmit={(e) => SubAdd(e)} action = '' >
    //             <div className="form-group" >
    //               <label for="formGroupExampleInput"> Produit  </label>
    //               <select className="custom-select"
    //                 onChange={(e) => { setTarget(e.target) }}>
    //                 <option hidden selected>Choose...</option>
    //                 {products.map((product) =>

    //                   <option key={product.id} data-key={product.id}  >{product.name}</option>
    //                 )
    //                 }
    //               </select>
    //             </div>

    //             <div className="form-group" >
    //               <label for="formGroupExampleInput">Quantité</label>
    //               <input type="text" className="form-control" id="formGroupExampleInput" placeholder='quantity' onChange={(e) => { setQuantity(e.target.value) }} />
    //             </div>

    //             <div className="form-group ">
    //               <label for="formGroupExampleInput"> Type de quantité </label>
    //               <select className="custom-select" onChange={(e) => { setType(e.target.value) }}>
    //                 <option selected hidden>Choose... </option>

    //                 <option >(U)nité </option>
    //                 <option >(L)itre </option>
    //                 <option > (G)ramme</option>

    //               </select>
    //             </div>

    //             <div className="modal-footer">

    //               <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
    //               <button type="submit" class="btn btn-primary"> Ajouter </button>
    //             </div>

    //           </form>
    //         </div>
    //         {/* end model add product */}
    //         {/* <button type="button" onClick={AddProduct} className="btn btn-primary"> Save </button> */}
    //       </div>
    //     </div>
    //   </div>
    // </>
  )
    
}
