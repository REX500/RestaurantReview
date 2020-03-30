import React from 'react';
import { connect, Provider } from 'react-redux';

const connectWithStore = (store, WrappedComponent, ...args) => {
	const ConnectedWrappedComponent = connect(...args)(WrappedComponent);
	return props => (
		<Provider store={store}>
			<ConnectedWrappedComponent {...props} />
		</Provider>
	);
};

export default connectWithStore;
