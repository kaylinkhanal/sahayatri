import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const inter = Inter({ subsets: ["latin"] });
import NavBar from "@/components/Navbar";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

export default function Home() {
	const [productsList, setProductsList] = useState([]);

	return <div></div>;
}

// {
//  favlist: [ '234rfdfawerwe', '3erfr32r32', '312fdsafdsa'],
//  cartList: []
// }

// redecers:{
//   addToCart(state,actions){
//     state.cartList
//     //
//   }
// }
