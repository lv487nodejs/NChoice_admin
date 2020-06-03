import React from 'react';

import CategoryDetails from '../../components/category-details';

const CategoryDetailsPageContainer = ({
  match: {
    params: {
      id: { id }
    }
  }
}) => (
  <div>
    <CategoryDetails categoryId={id} />
  </div>
);

export default CategoryDetailsPageContainer;
