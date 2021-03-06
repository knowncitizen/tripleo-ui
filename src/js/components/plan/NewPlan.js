/**
 * Copyright 2017 Red Hat Inc.
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

import { connect } from 'react-redux';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { ModalHeader, ModalTitle } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

import { CloseModalXButton, RoutedModal } from '../ui/Modals';
import {
  createPlan,
  createDefaultPlan,
  createPlanFromGit,
  createPlanFromTarball
} from '../../actions/PlansActions';
import PlanFormTabs from './PlanFormTabs';
import NewPlanForm from './NewPlanForm';

const messages = defineMessages({
  importPlan: {
    id: 'NewPlan.importPlan',
    defaultMessage: 'Import Plan'
  }
});

class NewPlan extends React.Component {
  handleFormSubmit = (
    { planName, planUploadType, files, tarball, gitUrl },
    dispatch,
    props
  ) => {
    switch (planUploadType) {
      case 'tarball':
        return this.props.createPlanFromTarball(planName, tarball);
      case 'directory':
        let planFiles = {};
        files.map(({ filePath, contents }) => (planFiles[filePath] = contents));
        return this.props.createPlan(planName, planFiles);
      case 'git':
        return this.props.createPlanFromGit(planName, gitUrl);
      case 'default':
        return this.props.createDefaultPlan(planName);
      default:
        return null;
    }
  };

  render() {
    return (
      <RoutedModal bsSize="lg" id="NewPlan__modal" redirectPath="/plans/manage">
        <ModalHeader>
          <CloseModalXButton />
          <ModalTitle>
            <FormattedMessage {...messages.importPlan} />
          </ModalTitle>
        </ModalHeader>
        <NewPlanForm onSubmit={this.handleFormSubmit}>
          <PlanFormTabs />
        </NewPlanForm>
      </RoutedModal>
    );
  }
}
NewPlan.propTypes = {
  createDefaultPlan: PropTypes.func,
  createPlan: PropTypes.func,
  createPlanFromGit: PropTypes.func,
  createPlanFromTarball: PropTypes.func,
  intl: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    createPlan: (planName, files) => {
      dispatch(createPlan(planName, files));
    },
    createDefaultPlan: planName => {
      dispatch(createDefaultPlan(planName));
    },
    createPlanFromTarball: (planName, archiveContents) => {
      dispatch(createPlanFromTarball(planName, archiveContents));
    },
    createPlanFromGit: (planName, gitUrl) => {
      dispatch(createPlanFromGit(planName, gitUrl));
    }
  };
}

export default injectIntl(connect(null, mapDispatchToProps)(NewPlan));
