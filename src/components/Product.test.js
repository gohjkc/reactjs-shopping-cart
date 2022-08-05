import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartContext from "../context/Context";
import CartDropdown from "./CartDropdown";
import Product from "./Product";
import Nav from "./Nav";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 1,
    }),
}));

const testProduct =
    { "id": 1, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 } }

test("add product from product page", async () => {
    render(
        <CartContext>
            <Product />
        </CartContext>
    );

    await waitFor(() =>
        screen.getByTestId("add-to-cart"),
        { timeout: 3000 }
    ).then((addToCartButton) => {
        fireEvent.click(addToCartButton);

        const cart = JSON.parse(localStorage.getItem("CART")) ?? [];

        expect(cart[0].id).toBe(testProduct.id);
    });
})

test("increase product quantity in cart", async () => {
    render(
        <CartContext>
            <MemoryRouter>
                <Nav />
                <CartDropdown />
            </MemoryRouter>
        </CartContext>
    );

    const cartButton = screen.getByTestId("cart");
    fireEvent.click(cartButton);

    await waitFor(() =>
        screen.getByTestId("increase-quantity"),
        { timeout: 3000 }
    ).then((increaseQuantityButton) => {
        fireEvent.click(increaseQuantityButton);

        const cart = JSON.parse(localStorage.getItem("CART")) ?? [];

        expect(cart[0].qty).toBe(2);
    })
})

test("decrease product quantity in cart", async () => {
    render(
        <CartContext>
            <MemoryRouter>
                <Nav />
                <CartDropdown />
            </MemoryRouter>
        </CartContext>
    );

    const cartButton = screen.getByTestId("cart");
    fireEvent.click(cartButton);

    await waitFor(() =>
        screen.getByTestId("decrease-quantity"),
        { timeout: 3000 }
    ).then((decreaseQuantityButton) => {
        fireEvent.click(decreaseQuantityButton);

        const cart = JSON.parse(localStorage.getItem("CART")) ?? [];

        expect(cart[0].qty).toBe(1);
    })
})

test("delete product from cart", async () => {
    render(
        <CartContext>
            <MemoryRouter>
                <Nav />
                <CartDropdown />
            </MemoryRouter>
        </CartContext>
    );

    const cartButton = screen.getByTestId("cart");
    fireEvent.click(cartButton);

    await waitFor(() =>
        screen.getByTestId("delete-from-cart"),
        { timeout: 3000 }
    ).then((deleteFromCartButton) => {
        fireEvent.click(deleteFromCartButton);

        const cart = JSON.parse(localStorage.getItem("CART")) ?? [];

        expect(cart).toHaveLength(0);
    })
})