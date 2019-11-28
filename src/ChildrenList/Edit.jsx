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
      showChildren: false,
    };
    this.onChangedData = this.onChangedData.bind(this);
  }

  componentDidMount() {
    this.setState({ showChildren: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showChildren !== this.state.showChildren) {
      this.onChangedData();
    }
  }

  onChangedData() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      showChildren: true,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const hasChildren = this.state.showChildren;
    const items = this.props.properties.items;
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
      </div>
    );
  }
}

export default injectIntl(Edit);
