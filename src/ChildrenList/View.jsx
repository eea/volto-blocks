/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';
import { Card } from 'semantic-ui-react';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, properties }) => (
  <div>
    {data.showChildren && (
      <Card fluid>
        <Card.Header>
          {' '}
          <h3 style={{ marginBottom: 0, padding: '0 1rem' }}>Navigation</h3>
        </Card.Header>
        <Card.Content>
          <Card.Group>
            {properties.items.map((item, i) => (
              <Card>
                <Card.Content>
                  <Link key={item.url} to={item.url}>
                    <h5>{item.title}</h5>
                  </Link>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Card.Content>
      </Card>
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
