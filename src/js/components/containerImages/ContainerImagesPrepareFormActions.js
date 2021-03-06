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

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Icon, Button } from 'patternfly-react';
import { submit, isSubmitting, isPristine, isInvalid } from 'redux-form';

import { CloseModalButton } from '../ui/Modals';
import { startContainerImagesPrepare } from '../../actions/ContainerImagesActions';

const messages = defineMessages({
  cancel: {
    id: 'ContainerImagesWizard.cancel',
    defaultMessage: 'Cancel'
  },
  save: {
    id: 'ContainerImagesPrepareFormActions.save',
    defaultMessage: 'Save Changes'
  },
  next: {
    id: 'ContainerImagesPrepareFormActions.next',
    defaultMessage: 'Next'
  },
  reset: {
    id: 'ContainerImagesPrepareFormActions.reset',
    defaultMessage: 'Reset to Defaults'
  }
});

const ContainerImagesPrepareFormActions = ({
  goForward,
  isSubmitting,
  isInvalid,
  isPristine,
  resetToDefaults,
  submitForm
}) => (
  <Fragment>
    <CloseModalButton>
      <FormattedMessage {...messages.cancel} />
    </CloseModalButton>
    <Button onClick={resetToDefaults} disabled={isSubmitting}>
      <FormattedMessage {...messages.reset} />
    </Button>
    <Button
      bsStyle="primary"
      onClick={submitForm}
      disabled={isSubmitting || isPristine || isInvalid}
    >
      <FormattedMessage {...messages.save} />
    </Button>
    <Button bsStyle="default" onClick={goForward} disabled={isSubmitting}>
      <FormattedMessage {...messages.next} />
      <Icon type="fa" name="angle-right" />
    </Button>
  </Fragment>
);
ContainerImagesPrepareFormActions.propTypes = {
  goForward: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  isPristine: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  resetToDefaults: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isSubmitting: isSubmitting('containerImagesPrepareForm')(state),
  isPristine: isPristine('containerImagesPrepareForm')(state),
  isInvalid: isInvalid('containerImagesPrepareForm')(state)
});

const mapDispatchToProps = dispatch => ({
  resetToDefaults: () => dispatch(startContainerImagesPrepare({})),
  submitForm: () => dispatch(submit('containerImagesPrepareForm'))
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(
    ContainerImagesPrepareFormActions
  )
);
