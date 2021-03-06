/**
 * Copyright 2018 Red Hat Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import cx from 'classnames';
import { startCase } from 'lodash';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { getNetworkColorStyle } from './utils';
import { NetworksHighlightContext } from './NetworksHighlighter';

const NetworkListItem = ({
  className,
  lineRef,
  name,
  children,
  disabled,
  ...rest
}) => {
  const { borderColor, backgroundColor } = getNetworkColorStyle(
    disabled ? 'disabled' : name
  );
  return (
    <NetworksHighlightContext.Consumer>
      {({ highlightedNetworks, setHighlightedNetworks }) => (
        <Fragment>
          <div
            className={cx('network-line', {
              highlighted: highlightedNetworks.includes(name)
            })}
          >
            <div className="network-line-ends" style={{ borderColor }} />
            <div
              ref={lineRef}
              className="network-line-edge"
              style={{ borderColor }}
            />
          </div>
          <div
            className="network"
            style={{ backgroundColor }}
            onMouseEnter={() => setHighlightedNetworks([name])}
            onMouseLeave={() => setHighlightedNetworks([])}
          >
            <h5>
              <strong>{startCase(name)}</strong>
            </h5>
            {children}
          </div>
        </Fragment>
      )}
    </NetworksHighlightContext.Consumer>
  );
};
NetworkListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  lineRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
NetworkListItem.defaultProps = {
  disabled: false
};

export default NetworkListItem;
