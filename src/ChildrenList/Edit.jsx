/**
 * Edit map block.
 * @module components/manage/Blocks/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes, { array } from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon, SidebarPortal, TextWidget } from '@plone/volto/components';
import { Dropdown, Segment, Checkbox, Input, Button } from 'semantic-ui-react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import './style.css';
import { Card } from 'semantic-ui-react';
import { settings } from '~/config';
import AddLinkForm from './AddLinkForm';

function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}

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
      catalogueList: this.props.data.catalogueList || [],
      catalogueSelectionList: this.props.data.catalogueSelectionList || [],
      details: [],
    };
  }
  getPath(url) {
    return url
      .replace(settings.apiPath, '')
      .replace(settings.internalApiPath, '');
  }
  componentDidMount() {
    console.log('-----', this.props.properties);
    this.setInitialCatalogueSelectionList();
  }

  resetCatalogueSelectionList = () => {
    const catalogueSelectionList =
      (this.props.properties.items.length &&
        this.props.properties.items.map(item => ({
          key: this.getPath(item['@id']),
          text: item.title || item.Title,
          value: this.getPath(item['@id']),
          description: item.description,
          image: item.image?.download,
        }))) ||
      [];
    this.setState({ catalogueSelectionList });
  };

  setInitialCatalogueSelectionList = () => {
    const catalogueSelectionListFromChildren =
      (this.props.properties.items.length &&
        this.props.properties.items.map(item => ({
          key: this.getPath(item['@id']),
          text: item.title || item.Title,
          value: this.getPath(item['@id']),
          description: item.description,
          image: item.image?.download,
        }))) ||
      [];
    const catalogueSelectionList = removeDuplicates(
      [
        ...catalogueSelectionListFromChildren,
        ...this.state.catalogueSelectionList,
      ],
      'key',
    );
    console.log('initial', this.state.catalogueSelectionList)
    this.setState({ catalogueSelectionList });
  };

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
      catalogueSelectionList: this.state.catalogueSelectionList,
    });
  }

  onChangeCatalogue = (event, data) => {
    this.setState({
      catalogue: data.checked,
    });
  };

  onChangeCatalogueListing = (event, data) => {
    this.setState({
      catalogueList: data.value,
    });
  };

  onAddLink = link => {
    this.setState({
      catalogueSelectionList: removeDuplicates(
        [...this.state.catalogueSelectionList, link],
        'key',
      ),
    });
  };

  render() {
    const childrenToDisplay = this.state.catalogue
      ? this.state.catalogueSelectionList.filter(item =>
          this.state.catalogueList.includes(item.value),
        )
      : this.state.catalogueSelectionList;
    return (
      <div>
        {!this.state.catalogueSelectionList &&
          !this.state.catalogueSelectionList.length && <div>No children</div>}
        {this.state.catalogue && !this.state.catalogueList.length && (
          <div>Please select items to display for catalogue intro</div>
        )}
        {childrenToDisplay.length && (
          <div fluid className="catalogue-listing-block">
            {childrenToDisplay.map((item, i) => (
              <div className="catalogue-listing-block-item">
                <Link key={item.value} to={item.value}>
                  <div className="catalogue-listing-block-item-title">
                    {item.text}
                  </div>
                  {item.description && <p>{item.description}</p>}
                  {item.image && (
                    <img
                      style={{ maxWidth: '100%' }}
                      src={item.image}
                      alt="icon"
                    />
                  )}
                </Link>
              </div>
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
                <p>Custom listing</p>
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
                    defaultValue={this.state.catalogueList}
                    multiple
                    search
                    selection
                    onChange={this.onChangeCatalogueListing}
                    options={this.state.catalogueSelectionList}
                  />
                </div>
              )}

              <div className="segment-row">
                <p>Non-children links</p>
                <AddLinkForm onAddLink={this.onAddLink} />
              </div>
              <div className="segment-row">
                <Button onClick={() => this.resetCatalogueSelectionList()}>
                  Remove non children from list
                </Button>
              </div>
            </Segment>
          </Segment.Group>
        </SidebarPortal>
      </div>
    );
  }
}

export default injectIntl(Edit);
