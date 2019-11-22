/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div>
    {data.items && (
      <ul>
        {data.items.map((item, i) => (
          <li key={i}>
            <Link to={item.url}>
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;