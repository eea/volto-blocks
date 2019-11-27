/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div>
    {data.items && (
      <React.Fragment>
        <h3 style={{ marginBottom: 0, padding: '0 1rem' }}>Navigation</h3>
        <ul className="childrenListBlock">
          {data.items.map((item, i) => (
            <li key={i}>
              <Link to={item.url}>
                <h5>{item.title}</h5>
              </Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
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
