import React, { Component } from 'react';
import Aux from '../../Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../Components/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.6,
	cheese: 0.4,
	meat: 1.3,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
		loading: false,
	};

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(key => ingredients[key])
			.reduce((sum, element) => {
				return sum + element;
			}, 0);
		this.setState({ purchaseable: sum > 0 });
	};

	addIngredientHandler = type => {
		const oldIngredientCount = this.state.ingredients[type];
		const newIngredientCount = oldIngredientCount + 1;
		const updateIngredient = { ...this.state.ingredients };
		updateIngredient[type] = newIngredientCount;

		const oldTotalPrice = this.state.totalPrice;
		const ingredientPrice = INGREDIENT_PRICES[type];
		const newTotalPrice = oldTotalPrice + ingredientPrice;

		this.setState({ totalPrice: newTotalPrice, ingredients: updateIngredient });
		this.updatePurchaseState(updateIngredient);
	};

	removeIngredientHandler = type => {
		const oldIngredientCount = this.state.ingredients[type];
		if (oldIngredientCount <= 0) return;
		const newIngredientCount = oldIngredientCount - 1;
		const updateIngredient = { ...this.state.ingredients };
		updateIngredient[type] = newIngredientCount;

		const oldTotalPrice = this.state.totalPrice;
		const ingredientPrice = INGREDIENT_PRICES[type];
		const newTotalPrice = oldTotalPrice - ingredientPrice;

		this.setState({ totalPrice: newTotalPrice, ingredients: updateIngredient });
		this.updatePurchaseState(updateIngredient);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Phu',
				address: {
					street: 'test_street',
					zipCode: '41351',
					country: 'Germany',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest',
		};

		axios
			.post('/orders', order)
			.then(response => {
				this.setState({ loading: false, purchasing: false });
				console.log(response);
			})
			.catch(err => {
				this.setState({ loading: false, purchasing: false });
				console.log(err);
			});
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = (
			<OrderSummary
				ingredients={this.state.ingredients}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				price={this.state.totalPrice}
			/>
		);

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientsAdded={this.addIngredientHandler}
					ingredientsRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchaseable={this.state.purchaseable}
					totalPrice={this.state.totalPrice}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
