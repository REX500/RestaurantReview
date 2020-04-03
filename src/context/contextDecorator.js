import { Component } from 'react';
import PropTypes from 'prop-types';

import MyContext from 'context';

/**
 * @description
 * So, this "decorator" component basically wraps around its children and
 * it adds any value data into the global context. This way we keep only
 * one context in the whole React app. Reason for this is to keep it simple
 * and not have multiple context's to worry about. I guess in a larger
 * project where we would use lots of contexts this wouldn't make so much
 * sense. In my case and since this is a small project I would argue that
 * this is a better approach because: less boilerplate, new components that would have
 * their own context don't have to create new context's and new files for it,
 * there is no need to use Context.Consumer in case we have multiple context's
 * because it will all be part of one, large context.
 * 
 * ! important
 * This context is to be used *only* to pass props and not as global store (Redux)
 */
class ContextDecorator extends Component {
	static contextType = MyContext;

	componentDidMount() {
    const { value } = this.props;
    const { decoratedExtraData, setDecoratedExtraData } = this.context;
  
    // add to extra data
    setDecoratedExtraData({ ...decoratedExtraData, ...value });
  }

	render() {
		return this.props.children;
	}
}

ContextDecorator.propTypes = {
	value: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
};

export default ContextDecorator;
