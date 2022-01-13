import { Add, Remove } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { deleteProduct } from "../JS/Actions/cartActions";
import { mobile } from "../responsive";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const [total, setTotal] = useState(0);
  const [afterDiscout, setAfterDiscout] = useState(0);
  const [shippingFees, setShippingFees] = useState(0);
  const [storageItems, setstorageItems] = useState(
    JSON.parse(localStorage.getItem("products"))
  );

  useEffect(() => {
    setstorageItems(JSON.parse(localStorage.getItem("products")));
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [storageItems]);

  useEffect(() => {
    setAfterDiscout(total * 0.9);
    setShippingFees(total/10);
  }, [total]);

  const calculateTotal = async () => {
    let toCalculate = 0;
    await storageItems.map((el) => (toCalculate += el.price * el.quantity));
    await setTotal(toCalculate);
  };
  

  const addLocalProductHandler = (id) => {
    storageItems.map((prod) =>
      prod._id === id ? { ...prod, quantity: prod.quantity++ } : null
    );
    localStorage.setItem("products", JSON.stringify(storageItems));
    storageItems = storageItems;
  };

  const reduLocalProductHandler = (id) => {
    // e.preventDefault();

    let products = JSON.parse(localStorage.getItem("products"));
    products.map((prod) =>
      prod._id === id
        ? { ...prod, quantity: prod.quantity > 1 && prod.quantity-- }
        : null
    );
    localStorage.setItem("products", JSON.stringify(products));
    storageItems = products;
  };

  const DeleteItem = (item) => {
    const items = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < items.length; i += 1) {
      if (items[i]._id === item._id) {
        items.splice(i, 1);
      }
      localStorage.setItem("products", JSON.stringify(items));
    }
  };
  let dispatch = useDispatch();
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {storageItems.map((item) => (
              <Product style={{ marginBottom: "10px" }}>
                <ProductDetail>
                  <Image src={item.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item._id}
                    </ProductId>
                    <ProductColor color={item.color} />
                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => reduLocalProductHandler(item._id)} />
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <Add onClick={() => addLocalProductHandler(item._id)} />
                  </ProductAmountContainer>
                  <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                  <TopButton style={{marginTop:"10px"}}
                   onClick={()=>{

const items = JSON.parse(localStorage.getItem("products"));
 for (let i = 0; i < items.length; i += 1) {
   if (items[i]._id ===item._id) {items.splice(i, 1)}
    localStorage.setItem("products", JSON.stringify(items));
};
}}>DELETE </TopButton>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>10 %</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ {shippingFees}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${afterDiscout}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
