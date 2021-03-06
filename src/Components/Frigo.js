import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Card, CardGroup, CardColumns, ListGroup, Button, Col, Row, Container, Form, Spinner } from 'react-bootstrap';
 
import { FcCheckmark } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import ModelAddProduct from "./FormComponents/ModelAddProduct"; 
  import Nav from './LayoutsComponents/Nav'
import { GetProductFrigo } from "./FunctionComponents/FrigoFunction";
// import Background_6 from '../img/sugar.jpg';
import '../App.css';
import Quantity from './LayoutsComponents/Quantity';
 
import { Box } from "@chakra-ui/core";
 
import ThemeContext from './LayoutsComponents/ThemeContext'
import SpinnerLoading from "./LayoutsComponents/SpinnerLoading";
export default function Frigo() {
    const { render, setRendering } = useContext(ThemeContext );

    const [categoriesProducts, setCategoriesProducts] = useState([])
    const [Show, setShow] = useState(true)

    useEffect(() => { 
        GetProductFrigo().then((res) => {
            setCategoriesProducts(res.data.success);
            setShow(false)
        }).catch((error) => {
            console.log(error);
        }) 
        console.log(render);
    }, [render])
 

    return (
        <>
            <Nav />

            <Container>
                <Row className=' p-4' 
                style= {{  backgroundColor : 'white' ,backgroundImage: `url(${require('../img/frigo_black.jpg')} )`, 
                  backgroundSize:' 602px 1100px' , backgroundRepeat: 'no-repeat' , borderRadius: '70px', }}   >
                <Box className='col-6 mt-3  '>
                        <Card.Title className='text-center text-capitalize title2' style = {{margin : '-13px'}}>   Ajouter un produit au frigo </Card.Title>

                        <ModelAddProduct className='mt-5' />

                    </Box>
                    {  Show ?
                     <Box className='col-6 align-self-center text-center' >
               <SpinnerLoading animation = 'border' /> 
                     </Box>
                 :

                       <Box className='col-6 ' style={{  maxHeight: ' 600px', overflow: 'auto' }} >
                        <Card.Title className='text-center text-capitalize title2'>  Voici tous les produits que vous possedez dans votre Frigo  </Card.Title>
                        {/* <Row xs={1} md={2} lg={2} className=' d-flex row '> */}
                        
                        {categoriesProducts.map((categorie , key) =>
                            
                                <Col  key = {key } >
                                    <Card text="dark" style={{   backgroundImage: `url(${categorie.category_image} )`,
                                     backgroundSize: '300px 150px' }}  >
                                        <Card.Body  >
                                            <Card.Title className='text-capitalize text-center'  >{categorie.category_name}</Card.Title>

                                            <ListGroup variant="flush" style={{ boxShadow:' 0px 8px 16px 0px rgb(0 0 0 / 59%)' , maxHeight: ' 200px', overflow: 'auto' }} >
                                                {Object.keys(categorie.products).map(key =>

                                                    <ListGroup.Item key = {categorie.products[key].id} >
                                                        <Row xs={2} md={4} lg={6}>
                                                            <span
                                                                style={{ textAlign: 'center', display: 'contents' }}>
                                                                {categorie.products[key].pivot.quantity}
                                                            </span>
                                                            <span
                                                                style={{ fontSize: '10px', textAlign: 'center', display: 'contents' }}>
                                                                {'[' + categorie.products[key].pivot.type + ']'}
                                                            </span>
                                                            <span className='ml-2'  >   {categorie.products[key].name}   </span>

                                                            <Quantity
                                                                qty={categorie.products[key].pivot.quantity}
                                                                IdProduct={categorie.products[key].id}
                                                                type={categorie.products[key].pivot.type} />
                                                        </Row>
                                                    </ListGroup.Item>
                                                )}
                                            </ListGroup>
                                        </Card.Body> 
                                    </Card>
                                    <br />
                                </Col> 
                        )}
                        {/* </Row> */}

                    </Box>
  
                    }
                   
                  
                </Row>
            </Container>

        
        </>
    )
}













// import React, { useState, useEffect, useContext } from "react";
// import axios from 'axios';
// import Nav from './Nav'
// import EditForm from "./EditForm";
// import Axios from "axios";
// import { Redirect } from "react-router-dom";
// import { isEmptyArray } from "formik";

// import{ getAllProduct ,AddProductFrigo,
//    GetProductFrigo,DeleteProductFrigo,
//    UploadFrigoImage }from "./FrigoFunction" ;
// import ModelAddProduct from "./ModalComponents/ModelAddProduct";
// import ModelUploadImage from "./ModalComponents/ModelUploadImage";


// export default function Frigo(props) {

//   const [frigoProducts, setFrigoProduct] = useState([] )
//   const [image_path, setImage_path] = useState( )
//   const [productId, setProductId] = useState()
//   const [ showImage, setShowImage] = useState( true )
//   const [init, setInit] = useState(0)

//   //*******  get product and image from table
//   useEffect( async() => {
//      await   GetProductFrigo().then(response => {
//         console.log(response.data.success[0])
//         setFrigoProduct(response.data.success[0])
//         setInit(!init)
//         // setShowImage(true) ;
//         setImage_path(response.data.success[1])
//       }).catch((error) => {
//         console.log('errorxxxx ' + error);
//       })
//   }, []);

//   //**** delete product  */
//   const deleteProduct = (e) => {
//     const product_id = e.target.getAttribute('data-key');
//     localStorage.setItem( 'deleteId',product_id);
//     console.log(product_id);
//   }
//   useEffect( () => {
//     DeleteProductFrigo().then((res) => {
//         console.log(res)
//       })
//   }, [localStorage.deleteId])


//     var Table = (
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th scope="col">Les Aliments </th>
//             <th scope="col">Quantité</th>
//             <th scope="col">Date d'Ajout </th>
//             <th scope="col">Supprimer</th>
//           </tr>
//         </thead>
//         <tbody>
//           {frigoProducts.map((product) =>
//             <tr>
//               <td key={product.id} > {product.name} </td>
//               <td>{product.pivot.quantity + ' ' + product.pivot.type}</td>
//               <td>{product.pivot.created_at}</td>
//               <td >
//                 <button data-key={product.id}
//                   onClick={deleteProduct} className="uk-button uk-button-primary uk-margin-top" style={{ backgroundColor: '#e43636', color: ' #f8f9fa' }}>
//                   Supprimer</button>
//               </td>
//             </tr>
//           )}
//         </tbody>
//         <ModelAddProduct/>
//       </table>
//     )

//     var FrigoImage =
//      (
//     <img className="uk-border-rounded-medium"
//       src={`http://localhost:1000/${image_path}`}
//       alt="Course Title" style={{ width: '500px', height: '500px' }}
//     />
//     )
//   // } else  {

//     var TableEmpty = (
//       <div>
//         <h3 style={{ color: 'black' }}>Votre Frigo est Vide </h3>
//         <ModelAddProduct/>
//       </div>
//     )

//     var FrigoImageDefault = (
//       <img src="http://localhost:1000/img/28-06-2020-GIoBvF6GZq.jpeg" alt="" style={{ width: '500px', height: '500px' }} />
//     )
  


//   return (
//     <>
//       <Nav />
//       <div>
//         <div className="uk-section uk-section-default uk-padding-remove-top">
//           <div className="uk-container">
//             <div className="uk-grid-large" data-uk-grid>
//               <div className="uk-width-1-2@m uk-flex uk-flex-middle">
//                 <div>
//                   {/* {    setTimeout(( () => */}
//                    { showImage ?   FrigoImage : FrigoImageDefault}
//                     {/* // ),20000) } */}
//    0
// {/*    
//              {showImage &&   (
//    FrigoImage
//    )} 
//               { !showImage &&   (
//        FrigoImageDefault

//    )}  */}
// {/* 
//                   { 
//                   // setTimeout(
//                      !showImage && (
//                     <img src="http://localhost:1000/img/28-06-2020-GIoBvF6GZq.jpeg" alt="" style={{ width: '500px', height: '500px' }} />
//                   )
//                     // ,20000)  
//                     } */}

                 

//                   {/*  Edit Frigo Image from model  */}
//                  < ModelUploadImage/>

//                 </div>
//               </div>
//               <div className="uk-width-1-2@m p-0">
//                 <div className="uk-background-primary uk-border-rounded-large uk-light uk-padding uk-margin-top" style={{ backgroundColor: ' #b7aaaa1a' }}>

//                 {/* { Table } */}
//                 {showImage  ? Table : TableEmpty  }
//              {/* { 
//             //  setTimeout(
//                  !showImage && (
//                     <div>
//                     <h3 style={{ color: 'black' }}>Votre Frigo est Vide </h3>
//                     <ModelAddProduct/>
//                   </div>
//                   )
//                   //  ,20000) 
//                    } */}

//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <footer className="uk-section uk-section-default" style={{backgroundColor: ' #e8e4db59 '}}>
//           <div className="uk-container uk-text-secondary uk-text-500">
//             <div className="uk-child-width-1-2@s" data-uk-grid>
//               <div>
//                 <a href="#" className="uk-logo">
//                   Kocina
//           </a>
//               </div>
//               <div className="uk-flex uk-flex-middle uk-flex-right@s">
//                 <div data-uk-grid className="uk-child-width-auto uk-grid-small">
//                   <div>
//                     <a
//                       href="https://www.facebook.com/"
//                       data-uk-icon="icon: facebook; ratio: 0.8"
//                       className="uk-icon-button facebook"
//                       target="_blank"
//                     />
//                   </div>
//                   <div>
//                     <a
//                       href="https://www.instagram.com/"
//                       data-uk-icon="icon: instagram; ratio: 0.8"
//                       className="uk-icon-button instagram"
//                       target="_blank"
//                     />
//                   </div>
//                   <div>
//                     <a
//                       href="mailto:info@blacompany.com"
//                       data-uk-icon="icon: twitter; ratio: 0.8"
//                       className="uk-icon-button twitter"
//                       target="_blank"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="uk-child-width-1-2@s uk-child-width-1-4@m" data-uk-grid>
//               <div>
//                 <ul className="uk-list uk-text-small">
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Presentations
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Professionals
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Stores
//               </a>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <ul className="uk-list uk-text-small">
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Webinars
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Workshops
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Local Meetups
//               </a>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <ul className="uk-list uk-text-small">
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Our Initiatives
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Giving Back
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Communities
//               </a>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <ul className="uk-list uk-text-small">
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Contact Form
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Work With Us
//               </a>
//                   </li>
//                   <li>
//                     <a className="uk-link-text" href="#">
//                       Visit Us
//               </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="uk-margin-medium-top uk-text-small uk-text-muted">
//               <div>
//                 Made by a{" "}
//                 <a
//                   className="uk-link-muted"
//                   href="https://drifter.works/"
//                   target="_blank"
//                 >
//                   Drifter
//           </a>{" "}
//           in Guatemala City.
//         </div>
//             </div>
//           </div>
//         </footer>

//         <div id="offcanvas" data-uk-offcanvas="flip: true; overlay: true">
//           <div className="uk-offcanvas-bar">
//             <a className="uk-logo" href="index.html">
//               Kocina
//       </a>
//             <button
//               className="uk-offcanvas-close"
//               type="button"
//               data-uk-close="ratio: 1.2"
//             />
//             <ul className="uk-nav uk-nav-primary uk-nav-offcanvas uk-margin-medium-top uk-text-center">
//               <li>
//                 <a href="index.html">Home</a>
//               </li>
//               <li>
//                 <a href="recipe.html">Recipe</a>
//               </li>
//               <li>
//                 <a href="search.html">Search</a>
//               </li>
//               <li className="uk-active">
//                 <a href="contact.html">Contact</a>
//               </li>
//               <li>
//                 <a href="sign-in.html">Sign In</a>
//               </li>
//               <li>
//                 <a href="sign-up.html">Sign Up</a>
//               </li>
//             </ul>
//             <div className="uk-margin-medium-top">
//               <a
//                 className="uk-button uk-width-1-1 uk-button-primary"
//                 href="sign-up.html"
//               >
//                 Sign Up
//         </a>
//             </div>
//             <div className="uk-margin-medium-top uk-text-center">
//               <div
//                 data-uk-grid
//                 className="uk-child-width-auto uk-grid-small uk-flex-center"
//               >
//                 <div>
//                   <a
//                     href="https://twitter.com/"
//                     data-uk-icon="icon: twitter"
//                     className="uk-icon-link"
//                     target="_blank"
//                   />
//                 </div>
//                 <div>
//                   <a
//                     href="https://www.facebook.com/"
//                     data-uk-icon="icon: facebook"
//                     className="uk-icon-link"
//                     target="_blank"
//                   />
//                 </div>
//                 <div>
//                   <a
//                     href="https://www.instagram.com/"
//                     data-uk-icon="icon: instagram"
//                     className="uk-icon-link"
//                     target="_blank"
//                   />
//                 </div>
//                 <div>
//                   <a
//                     href="https://vimeo.com/"
//                     data-uk-icon="icon: vimeo"
//                     className="uk-icon-link"
//                     target="_blank"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }


