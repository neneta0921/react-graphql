import React from 'react';
import { graphql, Query } from 'react-apollo';
import { flowRight } from 'lodash';
import { gql } from 'apollo-boost';

// import { GET_CART_HIDDEN } from '../../graphql/resolver';

import CheckoutPage from './checkout.component';

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const GET_CART_TOTAL = gql`
  {
    cartTotal @client
  }
`;

const CheckoutPageContainer = () => (
  <Query query={GET_CART_ITEMS}>
    {({ data: { cartItems } }) => (
      <Query query={GET_CART_TOTAL}>
        {({ data: { cartTotal } }) => <CheckoutPage cartItems={cartItems} cartTotal={cartTotal} />}
      </Query>
    )}
  </Query>
);

// export default flowRight(graphql(GET_CART_ITEMS), graphql(GET_CART_TOTAL))(CheckoutPageContainer);
export default CheckoutPageContainer;
