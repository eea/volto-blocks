/**
 * Edit map block.
 * @module components/manage/Blocks/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, SidebarPortal, TextWidget } from '@plone/volto/components';
import { Input, Segment, Checkbox } from 'semantic-ui-react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';

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
      title: '',
      itemsNumber: 0,
      hideTitle: false,
    };
    this.onChangedData = this.onChangedData.bind(this);
  }

  componentDidMount() {
    this.setState({ showChildren: true });

    let items = this.props.properties.items.length;
    let title = this.props.data.title;
    let hideTitle = this.props.properties.hideTitle;

    if (this.state.itemsNumber !== items) {
      this.setState({ itemsNumber: items });
    }

    if (this.state.title !== title) {
      this.setState({ title });
    }
    if (this.state.hideTitle !== hideTitle) {
      this.setState({ hideTitle });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.onChangedData();
    }
  }

  onChangedData() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      showChildren: true,
      title: this.state.title,
      items: this.state.itemsNumber,
      hideTitle: this.state.hideTitle,
    });
  }

  /**
   * Change url handler
   * @method onChangeTitle
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeTitle = ({ target }) => {
    this.setState({
      title: target.value,
    });
  };

  /**
   * Change url handler
   * @method onChangeItemsNumber
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeItemsNumber = ({ target }) => {
    this.setState({
      itemsNumber: target.value,
    });
  };

  /**
   * Change url handler
   * @method onChangeTitle
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeHide = () => {
    this.setState({
      hideTitle: !this.state.hideTitle,
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const hasChildren = this.state.showChildren;
    const title = this.state.title;
    const itemsNumber = this.state.itemsNumber;
    const hideTitle = this.state.hideTitle;

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
        <SidebarPortal selected={this.props.selected}>
          <Segment.Group raised>
            <header className="header pulled">
              <h2> Children List Block </h2>
            </header>
            <Segment className="form sidebar-image-data">
              <div className="segment-row">
                <p>Title</p>
                <Input
                  onChange={this.onChangeTitle}
                  placeholder="Change title"
                  value={title}
                  disabled={hideTitle}
                />
              </div>
              <div className="segment-row">
                <p>Max items</p>
                <Input
                  onChange={this.onChangeItemsNumber}
                  placeholder="How many items in list"
                  type="number"
                  value={itemsNumber}
                />
              </div>
              <div className="segment-row">
                <p>Hide Title</p>
                <Checkbox
                  toggle
                  checked={hideTitle}
                  onChange={this.onChangeHide}
                />
              </div>
            </Segment>
          </Segment.Group>
        </SidebarPortal>
      </div>
    );
  }
}

export default injectIntl(Edit);
