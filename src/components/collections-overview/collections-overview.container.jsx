import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import CollectionsOverview from './collections-overview.component';
import Spinner from '../spinner/spinner.component';

const GET_COLLECTION = gql`
  query getCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionsOverviewContainer = () => {
  return (
    <Query query={GET_COLLECTION}>
      {({ loading, data }) => {
        if (loading) return <Spinner />;
        const collections = data.collections;
        return <CollectionsOverview collections={collections} />;
      }}
    </Query>
  );
};

export default CollectionsOverviewContainer;
