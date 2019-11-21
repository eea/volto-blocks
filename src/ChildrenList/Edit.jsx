/**
 * Edit map block.
 * @module components/manage/Blocks/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      hasChildren: false,
      items: [],
    };
    this.onChangedData = this.onChangedData.bind(this);
  }

  componentDidMount() {
    if (this.state.items !== this.props.properties.items) {
      this.setState({ items: this.props.properties.items });
    }
  }

  onChangedData() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      items: this.state.items,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const items = this.props.properties.items;
    const hasChildren = items.length > 0 ? true : false;
    return (
      <div>
        {hasChildren && (
          <ul>
            {items.map((item, i) => (
              <li key={i}>
                <Link to={item.url}>
                  <p>{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!hasChildren && <p> There are no children to display </p>}
        <button onClick={this.onChangedData}>OK</button>
      </div>
    );
  }
}

export default injectIntl(Edit);