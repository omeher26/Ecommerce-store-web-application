import { HomeFilled, ShoppingCartOutlined} from"@ant-design/icons";
import {Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, Table, message} from "antd";
import Typography from "antd/es/typography/Typography";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { getCart } from "../../API";
// import { Children } from "react";

function AppHeader() {
    const navigate = useNavigate()

    const onMenuClick = (item) =>{
        navigate(`/${item.key}`);
    };

    return <div className="appHeader" >
        <Menu
        className="appMenu"

        onClick={onMenuClick}

        mode="horizontal"

        items = {[
            {
                label :<HomeFilled/>,
                key : "",
            },


            {
                label :"Men",
                key : "men",
                children :[
                {
                    label:"Men's Shirts ",
                    key:"mens-shirts ",
                },
                {
                    label:"Men's Shoes ",
                    key:"mens-shoes ",
                },
                {
                    label:"Men's Watches ",
                    key:"mens-watches ",
                },
            ],
            },


            {
                label :"Women",
                key : "women",
                children:[
                    {
                        label:"Women's Dresses",
                        key:"womens-dresses",
                    },
                    {
                        label:"Women's Shoes",
                        key:"womens-shoes",
                    },
                    {
                        label:"Women's Watches",
                        key:"womens-watches",
                    },
                    {
                        label:"Women's Bags",
                        key:"womens-bags",
                    },
                    {
                        label:"Women's Jewellery",
                        key:"womens-jewellery",
                    },
                ],
            },


            {
                label :"Fragrances",
                key : "fragrances"
            },
        ]}

        />
        <Typography.Title>Meher Store</Typography.Title>
        <AppCart/>
        
    </div>
  };

  function AppCart() {
    const [cartDrawerOpen, SetCartDrawerOpen] = useState(false);
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false)
    const [cartItems, setcartItems] = useState([])

    useEffect(()=>{
        getCart().then(res=>{
            setcartItems(res.products)
        })
    },[]);
    const onConfirmOrder=(values)=>{
        console.log({values});
        SetCartDrawerOpen(false)
        setCheckoutDrawerOpen(false)
        message.success("Your order has been placed successfully.")
    }
    return(
        <div>
          <Badge onClick={()=>{
            SetCartDrawerOpen(true)
          }} count={cartItems.length} className="shopingCartIcon" > 
              <ShoppingCartOutlined /> 
          </Badge> 
          <Drawer open={cartDrawerOpen} onClose={()=>{
            SetCartDrawerOpen(false)
          }} 
          title="Your Cart"
          contentWrapperStyle={{width:500}}
          >
            <Table 
            pagination={false}
            columns={[
            {
                title:'Title',
                dataIndex:'title'
            },
            {
                title:'Price',
                dataIndex:'price',
                render:(value)=>{
                    return <span>${value}</span>
                }
            },
            {
                title:'Quantity',
                dataIndex:'quantity',
                render:(value,record)=>{
                    return<InputNumber 
                    min={0} 
                    defaultValue={value} 
                    onChange={(value)=>{
                        setcartItems(pre => 
                            pre.map(cart=>{
                            if(record.id === cart.id){
                                cart.total = cart.price * value;
                            }
                            return cart
                        }) 
                        );
                    }} ></InputNumber>
                }
            },
            {
                title:'Total',
                dataIndex:'total',
                render:(value)=>{
                    return <span>${value}</span>
                }
            }
            ]} 
            dataSource={cartItems}
            summary={(data)=>{
                const total = data.reduce((pre,current)=>{
                    return pre+current.total
                },0);
                return <span>Total:{total}</span>;
            }}

            />

            <Button onClick={()=>{
                setCheckoutDrawerOpen(true)
            }} type="primary" >Checkout Your Cart</Button>
          </Drawer>


          <Drawer 
          open={checkoutDrawerOpen} 
          onClose={()=>{
            setCheckoutDrawerOpen(false)
          }} 
          title="Confirm Order"

          >

            <Form onFinish={onConfirmOrder} >

                <Form.Item label='Full Name' name='full_name' >
                    <Input placeholder="Enter Your Full Name" />
                </Form.Item>

                <Form.Item rules={[{ required:true,type:"email",message:"Please enter valid email"}]} label='Email' name='your_email' >
                    <Input placeholder="Enter Your Email" />
                </Form.Item>

                <Form.Item rules={[{ required:true,message:'Please enter your address'}]} label='Address' name='your_address' >
                    <Input placeholder="Enter Your Address" />
                </Form.Item>

                <Form.Item rules={[{ required:true,message:"Please enter your phone number"}]} label='Phone Number' name='your_phone number' >
                    <Input placeholder="Enter Your Phone Number" />
                </Form.Item>

                <Form.Item>
                    <Checkbox defaultChecked disabled >Cash on Delivery</Checkbox>
                </Form.Item>

                <Typography.Paragraph type="secondary">More methods comming soon</Typography.Paragraph>

                <Button type="primary" htmlType="submit"> {"  "} Confirm Order</Button>

            </Form>

          </Drawer>


        </div>


    );
  }

export default AppHeader;