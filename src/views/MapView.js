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
import { setClaim, removeClaim } from '../redux/actions/claims';

// import { MarkerIcon } from '../svg/MarkerIcon';
import colors from '../style/colors';

const mapStateToProps = state => {
  return {
    ui: state.ui,
    claims: state.claims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setClaim: claim => dispatch(setClaim(claim)),
    removeClaim: areaId => dispatch(removeClaim(areaId))
  };
};

type State = {
  zoomLevel: number,
  selectedArea: ?Object
};

type Props = {
  ui: Object,
  setClaim: Object => void,
  removeClaim: string => void
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
            fillColor:
              this.state.selectedArea &&
              this.state.selectedArea.area_id === area.area_id
                ? colors.yellow
                : '#000',
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

  renderClaimView() {
    if (!this.state.selectedArea) return null;
    const selectedAreaIsClaimed = this.props.claims.find(
      claim => claim.areaId === this.state.selectedArea.area_id
    );
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: selectedAreaIsClaimed ? 350 : 200,
            width: '100%',
            padding: 10,
            zIndex: 1,
            bottom: 0,
            backgroundColor: colors.background,
            opacity: colors.backgroundOpacity,
            color: 'white'
          }}
        >
          {selectedAreaIsClaimed && (
            <div
              style={{
                fontSize: 25,
                marginBottom: 20,
                textAlign: 'flex-start'
              }}
            >
              Dette området må ryddes innen {this.state.selectedArea.time}{' '}
              dager.
            </div>
          )}
          <div
            style={{ color: colors.yellow, fontSize: 20, fontWeight: 'bold' }}
          >
            {this.state.selectedArea.area_name}
          </div>
          <div>Type: Park</div>
          <div>Størrelse: {this.state.selectedArea.size}m2</div>
          <div>Poengfaktor: {this.state.selectedArea.point_factor}</div>
        </div>
        {selectedAreaIsClaimed ? (
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              bottom: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              onClick={() => {
                console.log('Angi som fullført.');
              }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: '80%',
                zIndex: 1,
                backgroundColor: colors.hamburgerMenu,
                marginBottom: 10
              }}
            >
              <div style={{ color: 'white' }}>ANGI SOM FULLFØRT</div>
            </div>
            <div
              onClick={() => {
                this.props.removeClaim(this.state.selectedArea.area_id);
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
              <div style={{ color: 'white' }}>FJERN KRAV</div>
            </div>
          </div>
        ) : (
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
                this.props.setClaim({
                  areaId: this.state.selectedArea.area_id,
                  claimTime: new Date()
                });
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
      </div>
    );
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
        {this.renderClaimView()}

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
