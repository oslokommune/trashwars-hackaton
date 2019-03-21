// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon
} from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { MAP_STYLE } from '../style/mapStyle';
import mockAreas from '../mock_data/areas';

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
  zoomLevel: number,
  selectedArea: ?Object
};

type Props = {
  ui: Object
};

class MapView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 15,
      selectedArea: null
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

  renderAreas() {
    return mockAreas.map(area => {
      return (
        <Polygon
          path={area.polygon.coordinates}
          key={area.area_id}
          options={{
            fillColor: '#000',
            fillOpacity: 0.4,
            strokeColor: '#000',
            strokeOpacity: 1,
            strokeWeight: 1
          }}
          onClick={() => {
            this.setState({
              selectedArea: area
            });
          }}
        />
      );
    });
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
        options={{
          streetViewControl: false,
          styles: MAP_STYLE,
          fullscreenControl: false,
          mapTypeControl: false
        }}
      >
        {/* {this.renderMarkers()} */}
        {this.renderAreas()}
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
        {this.state.selectedArea && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: 200,
              width: '100%',
              padding: 10,
              zIndex: 1,
              bottom: 0,
              backgroundColor: colors.background,
              opacity: colors.backgroundOpacity,
              color: 'white'
            }}
          >
            <div
              style={{ color: colors.yellow, fontSize: 20, fontWeight: 'bold' }}
            >
              {this.state.selectedArea.area_name}
            </div>
            <div>Type: Park</div>
            <div>Størrelse: {this.state.selectedArea.size}m2</div>
            <div>Poengfaktor: {this.state.selectedArea.point_factor}</div>
          </div>
        )}
        {this.state.selectedArea && (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              width: '100%',
              backgroundColor: 'red',
              bottom: 30,
              justifyContent: 'center'
            }}
          >
            <div
              onClick={() => {
                console.log('gjør krav på');
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: '80%',
                zIndex: 1,
                backgroundColor: colors.hamburgerMenu
              }}
            >
              <div style={{ color: 'white' }}>Gjør krav på</div>
            </div>
          </div>
        )}

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
