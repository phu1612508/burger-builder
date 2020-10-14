import React, { Component } from 'react';
import Aux from '../../Auxiliary/Auxiliary';
import Burger from '../../Components/Burger/Burger';
class BurgerBuilder extends Component {
	render() {
		return (
			<Aux>
				<Burger />
				<div>Build controls</div>
			</Aux>
		);
	}
}

export default BurgerBuilder;
