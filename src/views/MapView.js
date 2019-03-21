// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { MAP_STYLE } from '../style/mapStyle';
// import { MarkerIcon } from '../svg/MarkerIcon';
import colors from '../style/colors';

const mapStateToProps = state => {
  return {
    ui: state.ui
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

type State = {
  zoomLevel: number
};

type Props = {
  ui: Object
};

class MapView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 15
    };
    this.mapRef = React.createRef();
  }

  renderMarkers() {
    // return this.props.subjects.map(subject => {
    //   if (subject.published) {
    //     return (
    //       <MarkerWithLabel
    //         key={subject.id}
    //         position={{
    //           lat: subject.position.latitude,
    //           lng: subject.position.longitude
    //         }}
    //         icon={{
    //           url: subject.iconUri || null
    //         }}
    //         labelAnchor={new google.maps.Point(30, -3)}
    //         onClick={() => {
    //           this.props.setSelectedSubject(subject.id);
    //           this.props.setSelectedOperation(null);
    //         }}
    //       >
    //         <div
    //           style={{
    //             display: 'flex',
    //             width: 60,
    //             justifyContent: 'center'
    //           }}
    //         >
    //           <div
    //             style={{
    //               display: 'flex',
    //               backgroundColor: colors.component,
    //               color: colors.white,
    //               fontSize: 10,
    //               padding: 5,
    //               borderRadius: 10,
    //               textAlign: 'center'
    //             }}
    //           >
    //             {subject.name}
    //           </div>
    //         </div>
    //       </MarkerWithLabel>
    //     );
    //   }
    // });
  }

  _handleZoomChanged() {
    if (this.mapRef) {
      const zoomLevel = this.mapRef.context
        .__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.zoom;

      if (zoomLevel !== this.state.zoomLevel) {
        this.setState({ zoomLevel });
      }
    }
  }

  render() {
    const { ui } = this.props;
    // const bounds = new window.google.maps.LatLngBounds();
    // const coordinates = this.props.subjects.map(subject => {
    //   const { latitude, longitude } = subject.position;
    //   const latLng = new window.google.maps.LatLng(latitude, longitude);
    //   bounds.extend(latLng);
    // });
    // if (coordinates.length > 0 && !selectedSubject) {
    //   this.mapRef.fitBounds(bounds);
    // }
    const MapsComponent = withGoogleMap(props => (
      <GoogleMap
        ref={map => {
          this.mapRef = map;
          //   if (map && coordinates.length > 0 && !selectedSubject) {
          //     map.fitBounds(bounds);
          //   }
        }}
        defaultZoom={this.state.zoomLevel}
        center={{
          lat: 59.92344,
          lng: 10.75606
        }}
        onZoomChanged={() => this._handleZoomChanged()}
        options={{ streetViewControl: false, styles: MAP_STYLE }}
      >
        {/* {this.renderMarkers()} */}
      </GoogleMap>
    ));
    return (
      <div
        style={{
          zIndex: -1,
          position: 'absolute',
          height: '100vh',
          width: window.innerWidth
        }}
      >
        <MapsComponent
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: '100vh' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(MapView);
