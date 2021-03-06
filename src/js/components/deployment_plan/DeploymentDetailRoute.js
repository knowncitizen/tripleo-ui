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

import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import DeploymentDetail from '../deployment/DeploymentDetail';
import { deploymentStates as ds } from '../../constants/DeploymentConstants';

const DeploymentDetailRoute = ({ currentPlanName, deploymentStatus }) =>
  [ds.DEPLOYING, ds.UNDEPLOYING, ds.DEPLOY_FAILED, ds.UNDEPLOY_FAILED].includes(
    deploymentStatus
  ) ? (
    <DeploymentDetail />
  ) : (
    <Redirect to={`/plans/${currentPlanName}`} />
  );
DeploymentDetailRoute.propTypes = {
  currentPlanName: PropTypes.string.isRequired,
  deploymentStatus: PropTypes.string.isRequired
};

export default DeploymentDetailRoute;
