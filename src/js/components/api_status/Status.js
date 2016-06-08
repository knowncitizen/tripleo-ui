import ClassNames from 'classnames';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import React from 'react';
import Modal from '../ui/Modal';

import ApiStatusConstants from '../../constants/ApiStatusConstants';

export default class ApiStatusItem extends React.Component {
  render() {
    let connectionStatus, statusText;

    if(!this.props.data) {
      return null;
    }

    let classes = ClassNames({
      'alert': true,
      'alert-danger': this.props.data.success === false,
      'alert-success': this.props.data.success,
      'alert-info': this.props.data.isLoading === true
    });

    let iconClasses = ClassNames({
      'pficon': true,
      'pficon-error-circle-o': this.props.data.success === false,
      'pficon-ok': this.props.data.success,
      'pficon-info': this.props.data.isLoading === true
    });

    if(this.props.data.isLoading === true) {
      connectionStatus = 'Loading...';
    }
    else {
      connectionStatus = this.props.data.status === 0
        ? 'No Connection (CORS not configured, API down or host not available)'
        : this.props.data.status ? this.props.data.status : 'OK';
    }
    statusText = this.props.data.statusText ? (
        <p>{this.props.data.statusText}</p>
    ) : null;
    return (
      <div className={classes}>
        <span className={iconClasses}></span>
        <p><strong>{this.props.name}</strong> {connectionStatus}</p>
        {statusText}
      </div>
    );
  }
}

const Status = (props) => {
  return (
    <Modal dialogClasses="modal-lg">
       <div className="modal-header">
         <Link to={this.props.parentPath}
               type="button"
               className="close">
           <span aria-hidden="true" className="pficon pficon-close"/>
         </Link>
         <h4 className="modal-title">Services Status</h4>
       </div>
       <div className="row container-fluid">
         <div className="col-sm-12 col-lg-9">
          <section className="status-button">
            <article>
              <h2>Service Status</h2>
              <p>As of <span id="today">{(new Date(Date.now())).toString()}</span></p>
            </article>
          </section>

          <section className="status">
            <ApiStatusItem name="Keystone API" data={props.items.get(ApiStatusConstants.KEYSTONE)}/>
            <ApiStatusItem name="TripleO API" data={props.items.get(ApiStatusConstants.TRIPLEO)}/>
            <ApiStatusItem name="Ironic API" data={props.items.get(ApiStatusConstants.IRONIC)}/>
            <ApiStatusItem name="Validations API"
                           data={props.items.get(ApiStatusConstants.VALIDATIONS)}/>
            <ApiStatusItem name="Heat API" data={props.items.get(ApiStatusConstants.HEAT)}/>
          </section>

          <section className="legend">
            <article>
              <div className="legend-colour green"></div>
              <p>Working fine</p>

              <div className="legend-colour yellow"></div>
              <p>Possible issue</p>

              <div className="legend-colour red"></div>
              <p>Service failing</p>
            </article>
          </section>
        </div>
      </div>
      <div className="modal-footer">
        <Link to={this.props.parentPath}
              type="button"
              className="btn btn-primary">
          Close
        </Link>
      </div>
    </Modal>
  );
};

Status.propTypes = {
  items: ImmutablePropTypes.map.isRequired,
  parentPath: React.PropTypes.string.isRequired,
  data: React.PropTypes.object
};

Status.defaultProps = {
  parentPath: '/deployment-plan',
  data: {}
};
