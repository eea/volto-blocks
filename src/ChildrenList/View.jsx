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
const View = ({ data, properties }) => {
  const hideTitle = data.hideTitle;
  console.log('-------', properties.items)
  return (
    <div>
      {data.showChildren && (
        <Card fluid className="children-block">
          {!hideTitle && (
            <Card.Header>
              <h3 style={{ marginBottom: 0, padding: '0 1rem' }}>
                {data.title}
              </h3>
            </Card.Header>
          )}
          <Card.Content>
            <Card.Group>
              {properties.items.filter((item, index) => data.items ? index < data.items : true).map((item, i) => (
                <Card>
                  <Card.Content className="block-child">
                    <Link key={item.url} to={item.url}>
                      <h4>{item.title}</h4>
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
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
