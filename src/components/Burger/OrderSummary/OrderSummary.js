import React from 'react';
import Aux from '../../../Auxiliary/Auxiliary';

const orderSummary = (props) => {
	const ingredientSummary = props.ingredients;
	const itemSummary = Object.keys(ingredientSummary).map((key) => (
		<li key={key}>
			<span style={{ textTransform: 'capitalize' }}>{key}</span>: {ingredientSummary[key]}
		</li>
	));
	return (
		<Aux>
			<h3>Your Order</h3>
			<p>The delicious burger with the following ingredients:</p>
			<ul>{itemSummary}</ul>
			<p>Continue to check out?</p>
		</Aux>
	);
};

export default orderSummary;
