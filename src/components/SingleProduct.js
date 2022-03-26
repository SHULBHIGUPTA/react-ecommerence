import { Component } from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart, increase } from "../actions/action.js";

class SingleProduct extends Component {
  render() {
    return (
      <>
        <div className="single-product">
          <img src={this.props.product?.image} />
          <p>{this.props.product?.title}</p>
          <p>₹ {this.props.product?.price}</p>
          quantity = {this.props.quantity}
          {this.props.isPresent ? (
            <div>
              <button onClick={this.props.deleteProduct}>Remove</button>
              <button onClick={this.props.increaseQuantity}>increase </button>
            </div>
          ) : (
            <div>
              <button onClick={this.props.addProduct}>Add to Cart</button>
            </div>
          )}
        </div>
      </>
    );
  }
}


const mapStateToProps = (state, originalProps) => {

  const currentProductId = originalProps.product.id;
  const cartList = state.products;
  let isPresent = false;
  let quantity = 0;
  const result = cartList.filter((z) => z.id === currentProductId);
  if (result.length > 0) {
    quantity = result[0].quantity;
    isPresent = true;
  }

  return {
    isPresent,
    quantity,
  };
};


const mapDispatchToProps = (dispatch, originalProps) => {
  const addProduct = () => {
    dispatch(addToCart(originalProps.product));
  };

  const deleteProduct = () => {
    dispatch(removeFromCart(originalProps.product));
  };

  const printName = () => {
    console.log("abhishek");
  };

  const increaseQuantity = () => {
    dispatch(increase(originalProps.product));
  };

  return {
    addProduct,
    deleteProduct,
    printName,
    increaseQuantity,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
