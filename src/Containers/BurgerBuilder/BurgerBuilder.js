import React, { Component } from 'react';
import Aux from '../../Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
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
	};

	addIngredientHandler = (type) => {
		const oldIngredientCount = this.state.ingredients[type];
		const newIngredientCount = oldIngredientCount + 1;
		const updateIngredient = { ...this.state.ingredients };
		updateIngredient[type] = newIngredientCount;

		const oldTotalPrice = this.state.totalPrice;
		const ingredientPrice = INGREDIENT_PRICES[type];
		const newTotalPrice = oldTotalPrice + ingredientPrice;

		this.setState({ totalPrice: newTotalPrice, ingredients: updateIngredient });
	};

	removeIngredientHandler = (type) => {
		const oldIngredientCount = this.state.ingredients[type];
		if (oldIngredientCount <= 0) return;
		const newIngredientCount = oldIngredientCount - 1;
		const updateIngredient = { ...this.state.ingredients };
		updateIngredient[type] = newIngredientCount;

		const oldTotalPrice = this.state.totalPrice;
		const ingredientPrice = INGREDIENT_PRICES[type];
		const newTotalPrice = oldTotalPrice - ingredientPrice;

		this.setState({ totalPrice: newTotalPrice, ingredients: updateIngredient });
	};

	render() {
		const disabledInfo = { ...this.state.ingredients }
		for (let key in disabledInfo) {
			disabledInfo[key]=disabledInfo[key]<=0
		}
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientsAdded={this.addIngredientHandler}
					ingredientsRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
