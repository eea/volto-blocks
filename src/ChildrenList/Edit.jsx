/**
 * Edit map block.
 * @module components/manage/Blocks/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, SidebarPortal, TextWidget } from '@plone/volto/components';
import { Dropdown, Segment, Checkbox, Input } from 'semantic-ui-react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import './style.css';
import { Card } from 'semantic-ui-react';
import { settings } from '~/config';

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

  constructor(props) {
    super(props);
    this.state = {
      catalogue: props.data.catalogue || false,
      catalogueList: props.data.catalogueList || {},
      catalogueSelectionList: [],
      details: [],
    };
  }
  getPath(url) {
    return url
      .replace(settings.apiPath, '')
      .replace(settings.internalApiPath, '');
  }
  componentDidMount() {
    const catalogueSelectionList =
      this.props.properties.items.length &&
      this.props.properties.items.map(item => ({
        key: this.getPath(item['@id']),
        text: item.title || item.Title,
        value: this.getPath(item['@id']),
      }));
    this.setState({ catalogueSelectionList });
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      this.onChangeData();
    }
  }

  onChangeData() {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      catalogue: this.state.catalogue,
      catalogueList: this.state.catalogueList,
    });
  }

  onChangeCatalogue = (event, data) => {
    this.setState({
      catalogue: data.checked,
    });
  };

  onChangeCatalogueListing = (event, data) => {
    const currentList = JSON.parse(JSON.stringify(this.state.catalogueList));
    const newList = {};
    data.value.forEach(item => {
      newList[item] = {
        description: currentList[item]?.description || '',
        icon: currentList[item]?.icon || '',
      };
    });
    this.setState({
      catalogueList: newList,
    });
  };

  onChangeDescription = (itemKey, data) => {
    this.setState({
      catalogueList: {
        ...this.state.catalogueList,
        [itemKey]: {
          ...this.state.catalogueList[itemKey],
          description: data.value,
        },
      },
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const childrenToDisplay = this.state.catalogue
      ? this.state.catalogueSelectionList.filter(
          item => this.state.catalogueList[item.value],
        )
      : this.state.catalogueSelectionList;
    return (
      <div>
        {!this.state.catalogueSelectionList &&
          !this.state.catalogueSelectionList.length && <div>No children</div>}
        {this.state.catalogue &&
          !Object.keys(this.state.catalogueList).length && (
            <div>Please select items to display for catalogue intro</div>
          )}
        {childrenToDisplay.length && (
          <div fluid className="catalogue-listing-block">
            {childrenToDisplay.map((item, i) => (
              <Card>
                <Card.Content className="catalogue-listing-block-item">
                  <Link key={item.value} to={item.value}>
                    <h3 style={{ margin: 0 }}>{item.text}</h3>
                    {this.state.catalogueList[item.value]?.description && (
                      <p>{this.state.catalogueList[item.value].description}</p>
                    )}
                  </Link>
                </Card.Content>
              </Card>
            ))}
          </div>
        )}
        <SidebarPortal selected={this.props.selected}>
          <Segment.Group raised>
            <header className="header pulled">
              <h2> Children List Block </h2>
            </header>
            <Segment className="form sidebar-image-data">
              <div className="segment-row">
                <p>Use for catalogue listing</p>
                <Checkbox
                  toggle
                  checked={this.state.catalogue}
                  onChange={this.onChangeCatalogue}
                />
              </div>
              {this.state.catalogue && (
                <div>
                  <p>Pages to display</p>
                  <Dropdown
                    placeholder="Select catalogue links"
                    fluid
                    defaultValue={Object.keys(this.state.catalogueList)}
                    multiple
                    search
                    selection
                    onChange={this.onChangeCatalogueListing}
                    options={this.state.catalogueSelectionList}
                  />
                </div>
              )}
              {this.state.catalogue &&
                Object.keys(this.state.catalogueList).length &&
                childrenToDisplay.map(item => (
                  <div>
                    {item.text}
                    <Input
                      defaultValue={
                        this.state.catalogueList[item.value]?.description || ''
                      }
                      placeholder="Description"
                      onChange={(event, data) =>
                        this.onChangeDescription(item.value, data)
                      }
                    />
                  </div>
                ))}
            </Segment>
          </Segment.Group>
        </SidebarPortal>
      </div>
    );
  }
}

export default injectIntl(Edit);
