const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
    localStorage.clear();
});

const addToCart = async (name, price, stock, cart, updateCartMock) => {
    if (name in cart) {
        if (cart[name].inCart < stock) {
            cart[name].inCart++;
        } else {
            alert('You have reached the limit for the product.');
            return;
        }
    } else {
        cart[name] = { price, inCart: 1 };
    }

    const response = await fetch('/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, quantity: cart[name].inCart }),
    });

    if (response.ok) {
        updateCartMock();
    } else {
        console.error('Failed to add to cart:', response.statusText);
    }
};

const updateCartMock = jest.fn();

describe('addToCart', () => {
    it('should add a new product to the cart and updateCart is called', async () => {
        const cart = {};
        fetch.mockResponseOnce(JSON.stringify({ success: true }));

        await addToCart('Product A', 100, 5, cart, updateCartMock);

        expect(cart['Product A']).toEqual({ price: 100, inCart: 1 });
        expect(fetch).toHaveBeenCalledWith('/add-to-cart', expect.any(Object));
        expect(updateCartMock).toHaveBeenCalledTimes(1);
    });

    it('should increment the quantity of an existing product if stock allows', async () => {
        const cart = { 'Product A': { price: 100, inCart: 1 } };
        fetch.mockResponseOnce(JSON.stringify({ success: true }));

        await addToCart('Product A', 100, 5, cart, updateCartMock);

        expect(cart['Product A'].inCart).toBe(2);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should alert if adding exceeds stock limit', async () => {
        const cart = { 'Product A': { price: 100, inCart: 5 } };
        jest.spyOn(window, 'alert').mockImplementation(() => {}); 
        fetch.mockResponseOnce(JSON.stringify({ success: false }));

        await addToCart('Product A', 100, 5, cart, updateCartMock);

        expect(window.alert).toHaveBeenCalledWith('You have reached the limit for the product.');
        expect(cart['Product A'].inCart).toBe(5); 
        expect(updateCartMock).not.toHaveBeenCalled();
    });
});
